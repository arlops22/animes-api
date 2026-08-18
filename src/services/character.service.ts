import { IAnimesRepository } from '../interfaces/anime.interface.js';
import { ICharacterPayload, ICharactersRepository } from '../interfaces/character.interface.js';
import { HttpException } from '../interfaces/httpException.interface.js';

export class CharacterService {
    constructor(
        private characterRepository: ICharactersRepository,
        private animeRepository: IAnimesRepository,
    ) {}

    async create(payload: ICharacterPayload) {
        const { animeId } = payload;

        const anime = await this.animeRepository.findById(animeId);
        if (!anime) {
            throw new HttpException(404, 'Anime not found');
        }

        const response = await this.characterRepository.create(payload);
        return response;
    }

    async get(animeId: number) {
        const response = await this.characterRepository.findAll(animeId);
        return response;
    }

    async getById(id: number) {
        const response = await this.characterRepository.findById(id);

        if (!response) {
            throw new HttpException(404, 'Character not found');
        }

        return response;
    }

    async update(id: number, payload: ICharacterPayload) {
        const { animeId } = payload;

        const anime = await this.animeRepository.findById(animeId);
        if (!anime) {
            throw new HttpException(404, 'Anime not found');
        }

        const response = await this.characterRepository.update(Number(id), payload);
        return response;
    }

    async delete(id: number) {
        const response = await this.characterRepository.delete(Number(id));
        return response;
    }
}
