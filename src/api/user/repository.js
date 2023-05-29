import { RepositoryError } from '../../utils/error-handling.js';
import { conn } from '../../index.js';

export const getAllRepository = async () => {
    try {
        return conn.promise().query('SELECT username, email, firstName, lastName, age FROM user WHERE deletedAt IS NULL');
    } catch (err) {
        throw new RepositoryError(err.message, 500);
    }
};

export const getOneByUsernameRepository = async (username) => {
    try {
        return conn.promise().query(`SELECT username, email, firstName, lastName, age FROM user WHERE username = '${username}'`);
    } catch (err) {
        throw new RepositoryError(err.message, 500);
    }
};

export const getOneByEmailRepository = async (email) => {
    try {
        return conn.promise().query(`SELECT username, password, email, firstName, lastName, age FROM user WHERE email = '${email}'`);
    } catch (err) {
        throw new RepositoryError(err.message, 500);
    }
};

export const getOneRepository = async (id) => {
    try {
        return conn.promise().query(`SELECT username, email, firstName, lastName, age FROM user WHERE user_id = '${id}'`);
    } catch (err) {
        throw new RepositoryError(err.message, 500);
    }
};

export const createRepository = async (body) => {
    const {
        username, email, password, firstName, lastName,
        age, isEmailVerified, createdAt, updatedAt, deletedAt,
    } = body;
    try {
        await conn.promise().query(`INSERT INTO user 
        (username, email, password, firstName, lastName, age, isEmailVerified, createdAt, updatedAt, deletedAt) 
        VALUES 
        ('${username}', '${email}', '${password}', '${firstName}', '${lastName}',
         '${age}', '${isEmailVerified}', '${createdAt}', '${updatedAt}', '${deletedAt}')`);
        const gotten = await getOneByUsernameRepository(username);
        return gotten[0];
    } catch (err) {
        throw new RepositoryError(err.message, 500);
    }
};

export const updateRepository = async (id, body) => {
    try {
        const arr = [...Object.keys(body)];
        const arr1 = [...Object.values(body)];
        const set = [];
        for (let i = 0; i < arr.length; i++) {
            set.push(`${arr[i]} = '${arr1[i]}'`);
        }
        await conn.promise().query(`UPDATE user SET ${set.join(', ')} WHERE user_id = '${id}'`);
        const gotten = await getOneRepository(id);
        return gotten[0];
    } catch (err) {
        throw new RepositoryError(err.message, 500);
    }
};

export const deleteRepository = async (id) => {
    try {
        await conn.promise().query(`UPDATE user SET deletedAt = '${new Date().toISOString()} WHERE user_id = '${id}''`);
    } catch (err) {
        throw new RepositoryError(err.message, 500);
    }
};
