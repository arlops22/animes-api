import { it, describe, expect } from '@jest/globals';
import request from 'supertest';
import App from '../app';

describe('Server', () => {
    const app = new App().app;

    it('should run without error', async () => {
        const { status, body } = await request(app).get('/health-check');

        expect(status).toBe(200);
        expect(body).toEqual({ message: 'API running well!' });
    });
});
