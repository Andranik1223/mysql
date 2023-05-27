import { Router } from 'express';
import {
    changePasswordController,
    deleteController, getAllController,
    getOneController, updateController,
} from './controller.js';
import {
    changePasswordValidation, deleteValidation,
    getOneValidation, updateValidation,
} from './validation.js';
import { expressValidationResult } from '../../utils/middleware.js';

const router = Router();

router.get('/', getAllController);
router.get('/:id', ...getOneValidation(), expressValidationResult, getOneController);
router.put('/:id', ...updateValidation(), expressValidationResult, updateController);
router.delete('/:id', ...deleteValidation(), expressValidationResult, deleteController);
router.post('/change-password', ...changePasswordValidation(), expressValidationResult, changePasswordController);

export default router;
