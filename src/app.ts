import express, {NextFunction, Request, Response} from 'express';

import cors from 'cors';
import morgan from 'morgan';

import * as passportConfig from "./config/passport";
import * as routers from "./routes";

class App {
    public server;

    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        // JSON
        this.server.use(express.json());

        // Error handling
        this.server.use((err: any, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack);
            res.status(500).send('Unknown error occurred!');
            next();
        });

        // Request Logging
        this.server.use(morgan('combined'));

        // CORS
        this.server.use(cors());
    }

    routes() {
        // Authentication
        this.server.use("/auth", routers.auth);

        // User Profile
        this.server.use("/users", routers.users);

        // 404
        this.server.use((req, res, next) => {
            return res.status(404).send("Not found or invalid params");
        });
    }
}

export default new App().server;