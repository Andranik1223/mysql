/* eslint-disable no-console */
import mysql from 'mysql2';

const {
    MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_DB,
} = process.env;

export const conn = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB,
});

export const dbConfig = async () => {
    conn.connect((error) => {
        if (error) throw error;
        console.log('Connected !');
    });
};
