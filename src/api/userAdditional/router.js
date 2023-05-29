import { Router } from 'express';
import {
    createController, deleteController, getAllController,
    getOneController, updateController,
} from './controller.js';
import {
    createValidation, deleteValidation,
    getOneValidation, updateValidation,
} from './validation.js';
import { expressValidationResult } from '../../utils/middleware.js';

const router = Router();

router.get('/', getAllController);
router.get('/:id', ...getOneValidation(), expressValidationResult, getOneController);
router.post('/create', ...createValidation(), expressValidationResult, createController);
router.put('/:id', ...updateValidation(), expressValidationResult, updateController);
router.delete('/:id', ...deleteValidation(), expressValidationResult, deleteController);

export default router;
