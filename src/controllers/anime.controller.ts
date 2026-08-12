import { NextFunction, Request, Response } from 'express';

import { AnimesRepository } from '../interfaces/anime.interface.js';
import HttpException from '../interfaces/httpException.interface.js';

class AnimeController {
    constructor(private service: AnimesRepository) {}

    async store(req: Request, res: Response, next: NextFunction) {
        let payload = req.body;

        if (req.file) {
            payload = {
                ...payload,
                thumbnail: req.file.destination,
            };
        }

        const response = await this.service.create(payload);
        return res.status(201).json(response);
    }

    async get(req: Request, res: Response) {
        const data = await this.service.findAll(req.query);
        return res.status(200).json(data);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const responseData = await this.service.findById(Number(id));

        if (!responseData) {
            throw new HttpException(404, 'Anime not found');
        }

        return res.status(200).json(responseData);
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        let payload = req.body;

        if (req.file) {
            payload = {
                ...payload,
                thumbnail: req.file.destination,
            };
        }
        const response = await this.service.update(Number(id), payload);
        return res.status(200).json(response);
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const response = await this.service.delete(Number(id));
        return res.status(200).json(response);
    }
}

export default AnimeController;
