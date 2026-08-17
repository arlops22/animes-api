import { Router } from 'express';
import { prisma } from '../../database/prisma-client.js';

import { ISeasonsRepository } from '../../interfaces/season.interface.js';
import { SeasonsRepositoryPrisma } from '../../repositories/seasons.repository.js';
import { EpisodeController } from '../../controllers/episode.controller.js';
import { EpisodeService } from '../../services/episode.service.js';
import { EpisodesRepositoryPrisma } from '../../repositories/episodes.repository.js';
import { IEpisodesRepository } from '../../interfaces/episode.interface.js';

export class EpisodeRoutes {
    public router: Router;
    private seasonRepository: ISeasonsRepository;
    private episodeRepository: IEpisodesRepository;
    private episodeService: EpisodeService;
    private episodeController: EpisodeController;

    constructor() {
        this.router = Router({ mergeParams: true });
        this.seasonRepository = new SeasonsRepositoryPrisma(prisma);
        this.episodeRepository = new EpisodesRepositoryPrisma(prisma);
        this.episodeService = new EpisodeService(this.episodeRepository, this.seasonRepository);
        this.episodeController = new EpisodeController(this.episodeService);
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/', this.episodeController.store.bind(this));
        this.router.delete('/:id', this.episodeController.delete.bind(this));
        this.router.patch('/:id', this.episodeController.update.bind(this));
    }
}
