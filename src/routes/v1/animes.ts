import { Router } from 'express';

import AnimeController from '../../controllers/anime.controller.js';
import AnimesServicePrisma from '../../repositories/animes.repository.js';
import { AnimesRepository } from '../../interfaces/anime.interface.js';

class AnimeRoutes {
    public router: Router;
    private service: AnimesRepository;
    private animeController: AnimeController;

    constructor() {
        this.router = Router();
        this.service = new AnimesServicePrisma();
        this.animeController = new AnimeController(this.service);
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/', this.animeController.get.bind(this));
    }
}

export default AnimeRoutes;
