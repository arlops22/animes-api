import { PrismaClient } from '../../generated/prisma/client.js';
import { Anime, AnimePayload, AnimeFilter, AnimesRepository, AnimeList } from '../interfaces/anime.interface.js';

class AnimesRepositoryPrisma implements AnimesRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    create(payload: AnimePayload): Promise<Anime> {
        return this.prisma.anime.create({
            data: payload,
        });
    }

    async findAll(filter: AnimeFilter): Promise<AnimeList> {
        const limit = Math.max(1, Number(filter.pageSize) || 20);
        const page = Math.max(1, Number(filter.page) || 1);
        const skip = (page - 1) * limit;

        const [animes, count] = await this.prisma.$transaction([
            this.prisma.anime.findMany({
                select: {
                    id: true,
                    name: true,
                    thumbnail: true,
                    createdAt: true,
                    updatedAt: true,
                    summary: true,
                    author: true,
                },
                skip,
                take: limit,
                where: {
                    name: {
                        contains: filter.name,
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            this.prisma.anime.count(),
        ]);

        const totalPages = Math.ceil(count / limit);

        return { count, totalPages, page, animes };
    }

    findById(id: number): Promise<Anime | null> {
        return this.prisma.anime.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                thumbnail: true,
                createdAt: true,
                updatedAt: true,
                summary: true,
                author: true,
            },
        });
    }

    update(id: number, payload: AnimePayload) {
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
