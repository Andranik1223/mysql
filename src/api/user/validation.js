import { body } from 'express-validator';
import * as errMessage from '../../constants/error-messages.js';

export const createValidation = () => [
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

export const updateValidation = () => [
    body('username').optional()
        .isLength({ min: 3, max: 10 }).withMessage(errMessage.fromToString(3, 10)),
    body('firstName').optional()
        .isLength({ min: 3, max: 20 })
        .withMessage(errMessage.fromToString(3, 20))
        .isAlpha()
        .withMessage(errMessage.onlyLetters),
    body('lastName').optional()
        .isLength({ min: 3, max: 20 })
        .withMessage(errMessage.fromToString(3, 20))
        .isAlpha()
        .withMessage(errMessage.onlyLetters),
    body('age').optional()
        .isInt({ min: 5, max: 100 })
        .withMessage(errMessage.fromToInt(5, 100)),
    body('password').optional()
        .isLength({ min: 8, max: 20 })
        .withMessage(errMessage.fromToString(8, 20)),
    body('email').optional()
        .isEmail().withMessage(errMessage.isEmail),
];

export const changePasswordValidation = () => [
    body('oldPassword').isLength({ min: 8, max: 20 }).withMessage(errMessage.invalidCreds),
    body('newPassword').isLength({ min: 8, max: 20 }).withMessage(errMessage.invalidCreds),
    body('confirmedPassword').isLength({ min: 8, max: 20 }).withMessage(errMessage.invalidCreds),
];
