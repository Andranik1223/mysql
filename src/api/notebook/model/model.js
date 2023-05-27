import mongoose from 'mongoose';

const notebookSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    videoCard: {
        type: String,
        required: true,
    },
    processor: {
        type: String,
        required: true,
    },
    ram: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
});

export const Notebook = mongoose.model('Notebook', notebookSchema);
