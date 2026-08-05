import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger.js';

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const message: string = err.message ?? 'Internal server error';
    logger.error(err);

    res.status(500).json({ message });
};

export default errorMiddleware;
