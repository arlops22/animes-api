import { Request, Response } from 'express';

const ErrorMiddleware = (err: Error, req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
};

export default ErrorMiddleware;
