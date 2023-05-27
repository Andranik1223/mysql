import {
    changePasswordService,
    deleteService, getAllService,
    getOneService, updateService,
} from './service.js';

export const getAllController = async (req, res, next) => {
    try {
        res.send(await getAllService());
    } catch (err) {
        next(err);
    }
};

export const getOneController = async (req, res, next) => {
    try {
        const { id } = req.params;
        res.send(await getOneService(id));
    } catch (err) {
        next(err);
    }
};

export const updateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;
        res.send(await updateService(id, body));
    } catch (err) {
        next(err);
    }
};

export const deleteController = async (req, res, next) => {
    try {
        const { id } = req.params;
        res.send(await deleteService(id));
    } catch (err) {
        next(err);
    }
};

export const changePasswordController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;
        res.send(await changePasswordService(id, body));
    } catch (err) {
        next(err);
    }
};
