import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger.js';

import HttpException from '../interfaces/httpException.interface.js';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || 'Internal server error';

    logger.error(error);
    res.status(status).json({ message });
};

export default errorMiddleware;
