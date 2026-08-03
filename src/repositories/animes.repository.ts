import { Prisma } from '../../generated/prisma/client.js';
import prisma from '../database/prisma-client.js';
import { Anime, AnimesRepository } from '../interfaces/anime.interface.js';

class AnimesRepositoryPrisma implements AnimesRepository {
    create(payload: Prisma.AnimeCreateInput): Promise<Anime> {
        return prisma.anime.create({
            data: payload,
        });
    }

    findAll(): Promise<Anime[]> {
        return prisma.anime.findMany();
    }
}

export default AnimesRepositoryPrisma;
