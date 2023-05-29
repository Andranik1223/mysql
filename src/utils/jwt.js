import jwt from 'jsonwebtoken';
import { UtilsError } from './error-handling.js';
import { wrongToken } from '../constants/error-messages.js';

const { JWT_SECRET } = process.env;

export const getToken = (signData, expiresIn) => {
    try {
        return jwt.sign(signData, JWT_SECRET, { expiresIn });
    } catch (err) {
        throw new UtilsError(wrongToken, 498);
    }
};

export const decodeToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        throw new UtilsError(wrongToken, 498);
    }
};
