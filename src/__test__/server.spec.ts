import { it, describe, expect } from '@jest/globals';
import request from 'supertest';
import App from '../app';

describe('Server', () => {
    const app = new App().app;

    it('should run without error', async () => {
        const response = await request(app).get('/healthCheck');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'API running well!' });
    });
});
