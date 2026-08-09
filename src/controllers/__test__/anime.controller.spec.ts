import { NextFunction, Request, Response } from 'express';
import { it, describe, expect, jest, beforeEach } from '@jest/globals';
import { mockDeep, mockReset } from 'jest-mock-extended';
import { Prisma } from '../../../generated/prisma/client';

import AnimeController from '../anime.controller';
import AnimesRepositoryPrisma from '../../repositories/animes.repository';
import { Anime } from '../../interfaces/anime.interface';

const mockAnime: Anime = {
    id: 1,
    name: 'Anime Test',
    summary: 'This is a test summary',
    author: null,
    thumbnail: null,
    createdAt: new Date(),
    updatedAt: new Date(),
};

jest.mock('../../repositories/animes.repository');

describe('Anime Controller', () => {
    let req: Partial<Request>, res: Partial<Response>, next: NextFunction;
    const animeRepositoryMock = mockDeep<AnimesRepositoryPrisma>();
    const animeController = new AnimeController(animeRepositoryMock);

    beforeEach(() => {
        req = { body: {}, params: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as Partial<Response>;
        next = jest.fn();
        mockReset(animeRepositoryMock);
    });

    describe('Store animes endpoint', () => {
        it('should create an anime', async () => {
            const mockAnimePayload: Prisma.AnimeCreateInput = {
                name: 'Anime Test',
            };
            req.body = mockAnimePayload;

            animeRepositoryMock.create.mockResolvedValue(mockAnime);

            await animeController.store(req as Request, res as Response, next);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockAnime);
        });
    });

    describe('Get animes endpoint', () => {
        it('should return all animes', async () => {
            animeRepositoryMock.findAll.mockResolvedValue([mockAnime]);

            await animeController.get(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([mockAnime]);
        });
    });

    describe('Get anime by id endpoint', () => {
        it('should return a single anime', async () => {
            req = { params: { id: '1' } };

            animeRepositoryMock.findById.mockResolvedValue(mockAnime);

            await animeController.getById(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockAnime);
        });

        it('should throw 404 error if anime not found', async () => {
            req = { params: { id: '99' } };

            animeRepositoryMock.findById.mockResolvedValue(null);

            expect(animeController.getById(req as Request, res as Response)).rejects.toThrow(
                'Anime not found',
            );
            expect(animeController.getById(req as Request, res as Response)).rejects.toHaveProperty(
                'status',
                404,
            );
        });
    });
});
