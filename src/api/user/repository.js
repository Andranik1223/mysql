import { RepositoryError } from '../../utils/error-handling.js';
import { User } from './model/model.js';

export const getOneByUsernameRepository = async (username) => {
    try {
        return await User.findOne({ username });
    } catch (err) {
        throw new RepositoryError(err.message, 500);
    }
};

export const getOneByEmailRepository = async (email) => {
    try {
        return await User.findOne({ email });
    } catch (err) {
        throw new RepositoryError(err.message, 500);
    }
};

export const getAllRepository = async (projections) => {
    try {
        return await User.find().where({ deletedAt: undefined }).select(projections);
    } catch (err) {
        throw new RepositoryError(err.message, 500);
    }
};

export const getOneRepository = async (id, projections) => {
    try {
        return await User.findOne({ _id: id }).where({ deletedAt: undefined }).select(projections);
    } catch (err) {
        throw new RepositoryError(err.message, 500);
    }
};

export const createRepository = async (body) => {
    try {
        const created = new User(body);
        return await created.save();
    } catch (err) {
        throw new RepositoryError(err.message, 500);
    }
};

export const updateRepository = async (id, body) => {
    try {
        await User.updateOne({ _id: id }, body);
        return body;
    } catch (err) {
        throw new RepositoryError(err.message, 500);
    }
};

export const deleteRepository = async (id) => {
    try {
        await User.updateOne({ _id: id }, { deletedAt: new Date() });
        return id;
    } catch (err) {
        throw new RepositoryError(err.message, 500);
    }
};
