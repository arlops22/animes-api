import { it, describe, expect } from '@jest/globals';
import request from 'supertest';
import App from '../app';

describe('Server', () => {
    const app = new App().app;

    it('should be healthy', async () => {
        const { status, body } = await request(app).get('/health-check');

        expect(status).toBe(200);
        expect(body).toEqual({ message: 'API running well!' });
    });

    it('should handle unknown routes', async () => {
        const { status, body } = await request(app).get('/test');

        expect(status).toBe(404);
        expect(body).toEqual({ message: 'Route not found!' });
    });
});
