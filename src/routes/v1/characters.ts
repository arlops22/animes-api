import { Router } from 'express';
import { prisma } from '../../database/prisma-client.js';
import { upload } from '../../config/multer.config.js';

import { IAnimesRepository } from '../../interfaces/anime.interface.js';
import { AnimesRepositoryPrisma } from '../../repositories/animes.repository.js';
import { ICharactersRepository } from '../../interfaces/character.interface.js';
import { CharacterService } from '../../services/character.service.js';
import { CharactersRepositoryPrisma } from '../../repositories/character.repository.js';
import { CharacterController } from '../../controllers/character.controller.js';

export class CharactersRoutes {
    public router: Router;
    private characterRepository: ICharactersRepository;
    private animeRepository: IAnimesRepository;
    private characterService: CharacterService;
    private characterController: CharacterController;

    constructor() {
        this.router = Router({ mergeParams: true });
        this.characterRepository = new CharactersRepositoryPrisma(prisma);
        this.animeRepository = new AnimesRepositoryPrisma(prisma);
        this.characterService = new CharacterService(this.characterRepository, this.animeRepository);
        this.characterController = new CharacterController(this.characterService);
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/', upload.single('photo'), this.characterController.store.bind(this.characterController));
        this.router.get('/', this.characterController.get.bind(this.characterController));
        this.router.get('/:id', this.characterController.getById.bind(this.characterController));
        this.router.delete('/:id', this.characterController.delete.bind(this.characterController));
        this.router.patch(
            '/:id',
            upload.single('photo'),
            this.characterController.update.bind(this.characterController),
        );
    }
}
