import { it, describe, expect, jest } from '@jest/globals';
import { NextFunction, Request, Response } from 'express';

import errorMiddleware from '../error.middleware';

describe('Error middleware', () => {
    it('should respond with the correct status and message', () => {
        const error: Error = {
            name: 'test error',
            message: 'Test error',
        };

        const req: Partial<Request> = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as Partial<Response>;
        const next: NextFunction = jest.fn();

        errorMiddleware(error, req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Test error',
        });
    });
});
