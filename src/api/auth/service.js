import { ServiceError } from '../../utils/error-handling.js';
import { emailNotVerified, expiredToken, invalidCreds } from '../../constants/error-messages.js';
import {
    createService as createUserService,
    updateService as updateUserService,
} from '../user/service.js';
import { decodeToken, getToken } from '../../utils/jwt.js';
import { sendEmail } from '../../utils/email.js';
import { comparePassword, hashPassword } from '../../utils/bcrypt.js';
import { getOneByEmailRepository } from '../user/repository.js';

export const signupService = async (body) => {
    const user = await createUserService(body);
    const token = getToken({ id: user.id }, '15m');
    await sendEmail(user.email, 'Your verification token', token);
    return user;
};

export const signinService = async (body) => {
    let user;
    try {
        const { email, password } = body;
        user = await getOneByEmailRepository(email);
        await comparePassword(password, user[0][0].password);
    } catch (err) {
        throw new ServiceError(invalidCreds, 401);
    }
    if (!user?.isEmailVerified) {
        const token = getToken({ id: user.id }, '15m');
        await sendEmail(user.email, 'Your verification token', token);
        throw new ServiceError(emailNotVerified, 401);
    }
    return getToken({ id: user.id }, '360d');
};

export const verifyEmailService = async (id, body) => {
    try {
        const { token } = body;
        decodeToken(token);
        await updateUserService(id, { isEmailVerified: 1 });
    } catch (err) {
        throw new ServiceError(expiredToken, 401);
    }
};

export const forgetPasswordService = async (body) => {
    const { email } = body;
    const user = await getOneByEmailRepository(email);
    if (!user) {
        throw new ServiceError(invalidCreds, 401);
    }
    try {
        const token = getToken({ id: user.id }, '15m');
        await sendEmail(user.email, 'Please confirm Email', token);
    } catch (err) {
        throw new ServiceError(expiredToken, 401);
    }
};

export const recoverPasswordService = async (body) => {
    const { token, newPassword, confirmPassword } = body;
    let decoded;
    try {
        decoded = decodeToken(token);
    } catch (err) {
        throw new ServiceError(expiredToken, 401);
    }
    if (newPassword !== confirmPassword) {
        throw new ServiceError(invalidCreds, 401);
    }
    const hash = hashPassword(confirmPassword);
    await updateUserService(decoded.id, { password: hash });
};
