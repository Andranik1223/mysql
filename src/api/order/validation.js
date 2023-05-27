import { body, param } from 'express-validator';
import * as errMessage from '../../constants/error-messages.js';

export const getOneValidation = () => [
    param('id').isMongoId().withMessage(errMessage.isMongoId),
];

export const createValidation = () => [
    body('user')
        .isMongoId().withMessage(errMessage.isMongoId),
    body('notebook')
        .isMongoId().withMessage(errMessage.isMongoId),
];

export const updateValidation = () => [
    body('user').optional()
        .isMongoId().withMessage(errMessage.isMongoId),
    body('notebook').optional()
        .isMongoId().withMessage(errMessage.isMongoId),
];

export const deleteValidation = () => [
    param('id').isMongoId().withMessage(errMessage.isMongoId),
];
