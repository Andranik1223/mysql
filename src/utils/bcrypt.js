import bcrypt from 'bcrypt';

const { SALT_ROUNDS } = process.env;

export const hashPassword = async (password) => bcrypt.hash(password, Number(SALT_ROUNDS));

export const comparePassword = async (password, hash) => {
    const compared = bcrypt.compare(password, hash);
    if (!compared) {
        return new Error();
    }
    return compared;
};
