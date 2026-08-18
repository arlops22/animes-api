import { PrismaClient } from '../../generated/prisma/client.js';

import { ICharacter, ICharacterPayload, ICharactersRepository } from '../interfaces/character.interface.js';

export class CharactersRepositoryPrisma implements ICharactersRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    create(payload: ICharacterPayload): Promise<ICharacter> {
        return this.prisma.character.create({
            data: payload,
        });
    }

    findAll(animeId: number): Promise<ICharacter[]> {
        return this.prisma.character.findMany({
            where: {
                animeId,
            },
        });
    }

    findById(id: number): Promise<Partial<ICharacter> | null> {
        return this.prisma.character.findUnique({
            where: { id },
            select: {
                name: true,
                description: true,
                lifeStory: true,
                photo: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    update(id: number, payload: ICharacterPayload) {
        return this.prisma.character.update({
            where: { id },
            data: payload,
        });
    }

    delete(id: number) {
        return this.prisma.character.delete({
            where: { id },
        });
    }
}
