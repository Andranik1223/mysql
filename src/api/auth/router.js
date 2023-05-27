import { Router } from 'express';
import {
    forgetPasswordController,
    recoverPasswordController,
    signinController,
    signupController,
    verifyEmailController,
} from './controller.js';
import {
    forgetPassWordValidation,
    recoverPasswordValidation,
    signinValidation,
    signupValidation,
    verifyEmailValidation,
} from './validation.js';
import { expressValidationResult } from '../../utils/middleware.js';

const router = Router();

router.post('/signup', ...signupValidation(), expressValidationResult, signupController);
router.post('/signin', ...signinValidation(), expressValidationResult, signinController);
router.post('/verify-email', ...verifyEmailValidation(), expressValidationResult, verifyEmailController);
router.post('/forget-password', ...forgetPassWordValidation(), expressValidationResult, forgetPasswordController);
router.post('/recover-password', ...recoverPasswordValidation(), expressValidationResult, recoverPasswordController);

export default router;
