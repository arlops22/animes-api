import { Router } from 'express';
import prisma from '../../database/prisma-client.js';

import AnimeController from '../../controllers/anime.controller.js';
import AnimesServicePrisma from '../../repositories/animes.repository.js';
import { AnimesRepository } from '../../interfaces/anime.interface.js';

class AnimeRoutes {
    public router: Router;
    private service: AnimesRepository;
    private animeController: AnimeController;

    constructor() {
        this.router = Router();
        this.service = new AnimesServicePrisma(prisma);
        this.animeController = new AnimeController(this.service);
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/', this.animeController.store.bind(this));
        this.router.get('/', this.animeController.get.bind(this));
        this.router.get('/:id', this.animeController.getById.bind(this));
        this.router.delete('/:id', this.animeController.delete.bind(this));
        this.router.patch('/:id', this.animeController.update.bind(this));
    }
}

export default AnimeRoutes;
