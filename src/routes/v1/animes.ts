import { Router } from 'express';
import { body } from 'express-validator';
import { prisma } from '../../database/prisma-client.js';
import { upload } from '../../config/multer.config.js';

import { AnimeController } from '../../controllers/anime.controller.js';
import { AnimeService } from '../../services/anime.service.js';
import { AnimesRepositoryPrisma } from '../../repositories/animes.repository.js';
import { IAnimesRepository } from '../../interfaces/anime.interface.js';
import { SeasonRoutes } from './season.js';
import { validatorMiddleware } from '../../middlewares/validator.middleware.js';

class AnimeRoutes {
    public router: Router;
    private animeRepository: IAnimesRepository;
    private service: AnimeService;
    private animeController: AnimeController;
    private seasonRoutes: SeasonRoutes;

    constructor() {
        this.router = Router();
        this.animeRepository = new AnimesRepositoryPrisma(prisma);
        this.service = new AnimeService(this.animeRepository);
        this.animeController = new AnimeController(this.service);
        this.seasonRoutes = new SeasonRoutes();
        this.initRoutes();
    }

    private validatePayload() {
        return [body('name').notEmpty().withMessage('Name is required'), validatorMiddleware];
    }

    initRoutes() {
        this.router.post(
            '/',
            upload.single('thumbnail'),
            this.validatePayload(),
            this.animeController.store.bind(this),
        );
        this.router.get('/', this.animeController.get.bind(this));
        this.router.get('/:id', this.animeController.getById.bind(this));
        this.router.delete('/:id', this.animeController.delete.bind(this));
        this.router.patch(
            '/:id',
            upload.single('thumbnail'),
            this.validatePayload(),
            this.animeController.update.bind(this),
        );
        this.router.use('/:animeId/seasons', this.seasonRoutes.router);
    }
}

export default AnimeRoutes;
