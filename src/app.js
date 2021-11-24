import express from 'express';
import dotenv from 'dotenv';

import initMongoDb from './database/db.config';

import routes from './routes';

import errorHandling from './middlewares/errorHandling';
import errorNotFound from './middlewares/errorNotFound';

dotenv.config();
const app = express();

initMongoDb();

app.use(express.json());

app.use('/api', routes);

app.use(errorHandling);
app.use(errorNotFound);

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));
