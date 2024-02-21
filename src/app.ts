import express from 'express';

import corsMiddleware from './middleware/cors';
import authMiddleware from './middleware/authentication';
import errorMiddleware from "./middleware/error";
import jsonMiddleware from "./middleware/json";
import loggingMiddleware from "./middleware/logging";

import publicRoutes from './routes/publicRoutes';
import protectedRoutes from './routes/protectedRoutes';

class App {
    public server;

    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(jsonMiddleware);
        this.server.use(errorMiddleware);
        this.server.use(loggingMiddleware);
        this.server.use(corsMiddleware);
        this.server.use(authMiddleware);
    }

    routes() {
        this.server.use(publicRoutes);
        this.server.use(protectedRoutes);
    }
}

export default new App().server;