import { PrismaClient } from '../../generated/prisma/client.js';
import {
    Anime,
    AnimeCreatePayload,
    AnimesRepository,
    AnimeUpdatePayload,
} from '../interfaces/anime.interface.js';

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

    findById(id: number): Promise<Anime | null> {
        return this.prisma.anime.findUnique({
            where: { id },
        });
    }

    update(id: number, payload: AnimeUpdatePayload) {
        return this.prisma.anime.update({
            where: { id },
            data: payload,
        });
    }

    delete(id: number) {
        return this.prisma.anime.delete({
            where: { id },
        });
    }
}

export default AnimesRepositoryPrisma;
