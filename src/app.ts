import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import logger from 'morgan';

import notFound from './middleware/not-found';
import errorHandler from './middleware/error-handler';

import toolsRouter from './routes/tools.router';

import dbConnect from './db';

const app = express();

dbConnect();

app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.use(toolsRouter);

// catch 404 and forward to error handler
app.use(notFound);

// error handler
app.use(errorHandler);

export default app;
