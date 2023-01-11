import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import logger from './middleware/logger';
import notFound from './middleware/not-found';
import errorHandler from './middleware/error-handler';

import toolsRouter from './routes/tools.router';

import dbConnect from './db';

const app = express();

dbConnect();

app.set('x-powered-by', false);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(toolsRouter);

app.get('/health', (_req, res) => {
  res.status(204).send();
});

app.use(notFound);
app.use(errorHandler);

export default app;
