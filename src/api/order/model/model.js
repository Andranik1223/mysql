import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    notebook: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Notebook',
    },
});

export const Order = mongoose.model('Order', orderSchema);
