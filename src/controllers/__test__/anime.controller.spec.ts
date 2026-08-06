import { Request, Response } from 'express';
import { it, describe, expect, jest } from '@jest/globals';
import prismaMock from '../../__mocks__/prisma-client.mock';

import AnimeController from '../anime.controller';
import AnimesRepositoryPrisma from '../../repositories/animes.repository';

describe('Anime Controller', () => {
    const animeRepository = new AnimesRepositoryPrisma(prismaMock);
    const animeController = new AnimeController(animeRepository);

    describe('Get animes method', () => {
        it('should return all animes correctly', async () => {
            const req: Partial<Request> = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as Partial<Response>;

            const data = await animeController.get(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(data);
        });
    });
});
