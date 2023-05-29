import {
    createRepository, deleteRepository, getAllRepository,
    getOneByEmailRepository, getOneByUsernameRepository,
    getOneRepository, updateRepository,
} from './repository.js';
import { ServiceError } from '../../utils/error-handling.js';
import {
    notFound, usernameExists, emailExists, invalidCreds,
} from '../../constants/error-messages.js';
import { comparePassword, hashPassword } from '../../utils/bcrypt.js';

const existsByUsername = async (username) => {
    const gotten = await getOneByUsernameRepository(username);
    if (gotten[0][0]) {
        throw new ServiceError(usernameExists, 409);
    }
};

export const existsByEmail = async (email) => {
    const gotten = await getOneByEmailRepository(email);
    if (gotten[0][0]) {
        throw new ServiceError(emailExists, 409);
    }
};

export const getAllService = async () => {
    const gotten = await getAllRepository();
    return gotten[0];
};

export const getOneService = async (id) => {
    const gotten = await getOneRepository(id);
    if (!gotten || gotten[0][0] === undefined) {
        throw new ServiceError(notFound('User'), 404);
    }
    return gotten[0];
};

export const createService = async (body) => {
    const {
        username, email, password, firstName, lastName, age,
    } = body;
    await existsByUsername(username);
    await existsByEmail(email);
    const hash = await hashPassword(password);
    const created = await createRepository({
        username,
        email,
        firstName,
        lastName,
        age,
        password: hash,
        isEmailVerified: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
    });
    return created[0];
};

export const updateService = async (id, body) => {
    await getOneService(id);
    if (body.username) {
        await existsByUsername(body.username);
    }
    if (body.email) {
        await existsByEmail(body.email);
    }
    const updated = await updateRepository(id, body);
    return updated[0];
};

export const deleteService = async (id) => {
    await getOneService(id);
    const deleted = await deleteRepository(id);
    return deleted[0];
};

export const changePasswordService = async (id, body) => {
    const { oldPassword, newPassword, confirmPassword } = body;
    const user = await getOneService(id);
    try {
        await comparePassword(oldPassword, user.password);
    } catch (err) {
        throw new ServiceError(invalidCreds, 401);
    }
    if (newPassword !== confirmPassword) {
        throw new ServiceError(invalidCreds, 401);
    }
    const hash = await hashPassword(newPassword);
    await updateRepository(id, { password: hash });
};
