import express, { Response } from 'express';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get('/healthCheck', (_, res: Response) => {
    res.send('API running well!');
});

app.listen(PORT, () => {
    console.log(`App listen on port ${PORT}!`);
});
