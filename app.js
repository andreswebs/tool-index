const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const toolsRouter = require('./routes/tools.router');

const db = require('./db');

const app = express();

db.connect();

app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(toolsRouter);

// catch 404 and forward to error handler
app.use(notFound);

// error handler
app.use(errorHandler);

module.exports = app;
