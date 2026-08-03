import { Request, Response } from 'express';

const ErrorMiddleware = (err: Error, req: Request, res: Response) => {
    const message: string = err.message ?? 'Internal server error';
    console.error(err.stack);

    res.status(500).json({ message });
};

export default ErrorMiddleware;
