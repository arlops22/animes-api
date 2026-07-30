import express, { Application, Response } from 'express';
import { pinoHttp } from 'pino-http';

import logger from './utils/logger.js';
import NotFoundRouteMiddleware from './middlewares/not-found.middleware.js';
import ErrorMiddleware from './middlewares/error.middleware.js';

class App {
    public app: Application;

    constructor() {
        this.app = express();

        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    private initializeMiddleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(pinoHttp({ logger }));
    }

    private initializeErrorHandling() {
        this.app.use(NotFoundRouteMiddleware);
        this.app.use(ErrorMiddleware);
    }

    private initializeRoutes() {
        this.app.get('/health-check', (_, res: Response) => {
            res.status(200).json({ message: 'API running well!' });
        });
    }

    listen(port: string) {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}!`);
        });
    }
}

export default App;
