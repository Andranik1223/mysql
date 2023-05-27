import {
    forgetPasswordService,
    recoverPasswordService,
    signinService,
    signupService,
    verifyEmailService,
} from './service.js';

export const signupController = async (req, res, next) => {
    try {
        const { body } = req;
        res.send(await signupService(body));
    } catch (err) {
        next(err);
    }
};

export const signinController = async (req, res, next) => {
    try {
        const { body } = req;
        res.send(await signinService(body));
    } catch (err) {
        next(err);
    }
};

export const verifyEmailController = async (req, res, next) => {
    try {
        const { body } = req;
        await verifyEmailService(body);
        res.send({ message: 'Verified' });
    } catch (err) {
        next(err);
    }
};

export const forgetPasswordController = async (req, res, next) => {
    try {
        const { body } = req;
        res.send(await forgetPasswordService(body));
    } catch (err) {
        next(err);
    }
};

export const recoverPasswordController = async (req, res, next) => {
    try {
        const { body } = req;
        res.send(await recoverPasswordService(body));
    } catch (err) {
        next(err);
    }
};
