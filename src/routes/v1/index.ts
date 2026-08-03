import { Router } from 'express';

import AnimeRoutes from './animes.js';

class V1Routes {
    public router: Router;
    private animeRoutes = new AnimeRoutes();

    constructor() {
        this.router = Router();
        this.router.use('/animes', this.animeRoutes.router);
    }
}

export default V1Routes;
