import { it, describe, expect } from '@jest/globals';

import { Anime } from '../../interfaces/anime.interface';
import { Prisma } from '../../../generated/prisma/client';
import prismaMock from '../../__mocks__/prisma-client.mock';
import AnimesRepositoryPrisma from '../animes.repository';

describe('Animes Repository', () => {
    const animesRepository = new AnimesRepositoryPrisma(prismaMock);

    describe('Method findAll', () => {
        it('should return all animes correctly', async () => {
            const mockAnime: Anime = {
                id: 1,
                name: 'Anime Test',
                summary: 'This is a test summary',
                author: null,
                thumbnail: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            prismaMock.anime.findMany.mockResolvedValue([mockAnime]);

            const animes = await animesRepository.findAll();

            expect(animes).toStrictEqual([mockAnime]);
            expect(prismaMock.anime.findMany).toHaveBeenCalledTimes(1);
        });
    });

    describe('Method create', () => {
        it('should create an anime correctly', async () => {
            const mockAnimePayload: Prisma.AnimeCreateInput = {
                name: 'Anime Test',
            };

            const createdAnime: Anime = {
                ...mockAnimePayload,
                id: 1,
                author: null,
                summary: null,
                thumbnail: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            prismaMock.anime.create.mockResolvedValue(createdAnime);

            const anime = await animesRepository.create(mockAnimePayload);
            expect(anime).toStrictEqual(createdAnime);
            expect(prismaMock.anime.create).toHaveBeenCalledTimes(1);
        });
    });
});
