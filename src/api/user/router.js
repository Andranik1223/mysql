import { Router } from 'express';
import {
    changePasswordController,
    deleteController, getAllController,
    getOneController, updateController,
} from './controller.js';
import {
    changePasswordValidation, updateValidation,
} from './validation.js';
import { expressValidationResult } from '../../utils/middleware.js';

const router = Router();

router.get('/', getAllController);
router.get('/:id', getOneController);
router.put('/:id', ...updateValidation(), expressValidationResult, updateController);
router.delete('/:id', deleteController);
router.post('/change-password/:id', ...changePasswordValidation(), expressValidationResult, changePasswordController);

export default router;
