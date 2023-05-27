import mongoose from 'mongoose';

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_URL } = process.env;

export const dbConfig = async () => {
    mongoose.set('strictQuery', true);
    await mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URL}`);
};
