import { PrismaClient } from '../../generated/prisma/client.js';
import { Anime, AnimeCreatePayload, AnimesRepository } from '../interfaces/anime.interface.js';

class AnimesRepositoryPrisma implements AnimesRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    create(payload: AnimeCreatePayload): Promise<Anime> {
        return this.prisma.anime.create({
            data: payload,
        });
    }

    findAll(): Promise<Anime[]> {
        return this.prisma.anime.findMany();
    }
}

export default AnimesRepositoryPrisma;
