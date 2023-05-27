/* eslint-disable no-console */
import http from 'http';
import app from './src/api/app.js';
import { dbConfig } from './src/index.js';

await dbConfig();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('server is running on localhost 3000');
});
