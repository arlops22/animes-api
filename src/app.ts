import express, { Application, Response } from 'express';
import 'dotenv/config';

class App {
    public app: Application;

    constructor() {
        this.app = express();

        this.config();
        this.routes();
    }

    config() {
        this.app.use(express.json());
    }

    routes() {
        this.app.get('/healthCheck', (_, res: Response) => {
            res.status(200).json({ message: 'API running well!' });
        });
    }

    listen(port: string) {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}!`);
        });
    }
}

export default App;
