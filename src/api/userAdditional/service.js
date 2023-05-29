import {
    createRepository, deleteRepository, getAllRepository,
    getOneRepository, updateRepository,
} from './repository.js';
import { ServiceError } from '../../utils/error-handling.js';
import { notFound } from '../../constants/error-messages.js';

export const getAllService = async () => getAllRepository();

export const getOneService = async (id) => {
    const gotten = await getOneRepository(id);
    if (!gotten) {
        throw new ServiceError(notFound('Notebook'), 404);
    }
    return gotten;
};

export const createService = async (body) => createRepository(body);

export const updateService = async (id, body) => {
    await getOneService(id);
    return updateRepository(id, body);
};

export const deleteService = async (id) => {
    await getOneService(id);
    return deleteRepository(id);
};
