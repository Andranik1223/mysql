import { body } from 'express-validator';
import * as errMessage from '../../constants/error-messages.js';

export const signupValidation = () => [
    body('username')
        .isLength({ min: 3, max: 10 }).withMessage(errMessage.fromToString(3, 10)),
    body('firstName')
        .isLength({ min: 3, max: 20 })
        .withMessage(errMessage.fromToString(3, 20))
        .isAlpha()
        .withMessage(errMessage.onlyLetters),
    body('lastName')
        .isLength({ min: 3, max: 20 })
        .withMessage(errMessage.fromToString(3, 20))
        .isAlpha()
        .withMessage(errMessage.onlyLetters),
    body('age')
        .isInt({ min: 5, max: 100 })
        .withMessage(errMessage.fromToInt(5, 100)),
    body('password')
        .isLength({ min: 8, max: 20 })
        .withMessage(errMessage.fromToString(8, 20)),
    body('email')
        .isEmail().withMessage(errMessage.isEmail),
];

export const signinValidation = () => [
    body('email').isEmail().withMessage(errMessage.isEmail),
    body('password').isLength({ min: 8, max: 20 }).withMessage(errMessage.invalidCreds),
];

export const verifyEmailValidation = () => [
    body('token').isJWT().withMessage(errMessage.wrongToken),
];

export const forgetPassWordValidation = () => [
    body('email').isEmail().withMessage(errMessage.isEmail),
];

export const recoverPasswordValidation = () => [
    body('token').isJWT().withMessage(errMessage.wrongToken),
    body('newPassword').isLength({ min: 8, max: 20 }).withMessage(errMessage.invalidCreds),
    body('confirmPassword').isLength({ min: 8, max: 20 }).withMessage(errMessage.invalidCreds),
];
