import { body, param } from 'express-validator';
import * as errMessage from '../../constants/error-messages.js';
import { ram, color } from '../../constants/features.js';

export const getOneValidation = () => [
    param('id').isMongoId().withMessage(errMessage.isMongoId),
];

export const createValidation = () => [
    body('brand')
        .isLength({ min: 1, max: 20 }).withMessage(errMessage.fromToString(1, 20)),
    body('videoCard')
        .isString().withMessage(errMessage.isString),
    body('processor')
        .isString().withMessage(errMessage.isString),
    body('ram')
        .isIn(ram).withMessage(errMessage.isRam),
    body('color')
        .isIn(color).withMessage(errMessage.isColor),
];

export const updateValidation = () => [
    body('brand').optional()
        .isLength({ min: 1, max: 20 }).withMessage(errMessage.fromToString(1, 20)),
    body('videoCard').optional()
        .isString().withMessage(errMessage.isString),
    body('processor').optional()
        .isString().withMessage(errMessage.isString),
    body('ram').optional()
        .isIn(ram).withMessage(errMessage.isRam),
    body('color').optional()
        .isIn(color).withMessage(errMessage.isColor),
];

export const deleteValidation = () => [
    param('id').isMongoId().withMessage(errMessage.isMongoId),
];
