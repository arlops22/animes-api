import { Request, Response } from 'express';

import { AnimesRepository } from '../interfaces/anime.interface.js';

class AnimeController {
    constructor(private service: AnimesRepository) {}

    store() {}

    getById() {}

    async get(req: Request, res: Response) {
        try {
            const data = await this.service.findAll();
            return res.status(200).json(data);
        } catch (error) {
            throw error;
        }
    }

    update() {}

    delete() {}

    updateThumb() {}
}

export default AnimeController;
