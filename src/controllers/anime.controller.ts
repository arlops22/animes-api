import { Request, Response } from 'express';

import { AnimesRepository } from '../interfaces/anime.interface.js';

class AnimeController {
    constructor(private service: AnimesRepository) {}

    store(req: Request, res: Response) {}

    getById() {}

    async get(req: Request, res: Response) {
        const data = await this.service.findAll();
        return res.status(200).json(data);
    }

    update(req: Request, res: Response) {}

    delete(req: Request, res: Response) {}
}

export default AnimeController;
