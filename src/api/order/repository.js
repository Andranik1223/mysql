import { RepositoryError } from '../../utils/error-handling.js';
import { Order } from './model/model.js';

export const getAllRepository = async () => {
    try {
        return await Order.find();
    } catch (err) {
        throw new RepositoryError(err.message, 500);
    }
};

export const getOneRepository = async (id) => {
    try {
        return await Order.findOne({ _id: id });
    } catch (err) {
        throw new RepositoryError(err.message, 500);
    }
};

export const createRepository = async (body) => {
    try {
        const created = new Order(body);
        return await created.save();
    } catch (err) {
        throw new RepositoryError(err.message, 500);
    }
};

export const updateRepository = async (id, body) => {
    try {
        await Order.updateOne({ _id: id }, body);
        return body;
    } catch (err) {
        throw new RepositoryError(err.message, 500);
    }
};

export const deleteRepository = async (id) => {
    try {
        await Order.deleteOne({ _id: id });
        return id;
    } catch (err) {
        throw new RepositoryError(err.message, 500);
    }
};
