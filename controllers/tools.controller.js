const createError = require('http-errors');
const Tool = require('../models/tool');

// controller methods will forward known errors to the error handler

function getTools (req, res, next) {

  const tag = req.query.tag;

  const queryParams = tag ? { tags: { '$all': tag } } : {};

  const query = Tool.find(queryParams);

  return query.exec()
    .then(tools => res.json(tools))
    .catch(error => next(createError(500, error, { expose: false })));

}

function createTool (req, res, next) {

  const tool = new Tool(req.body);

  return tool.save()
    .then(tool => res.json(tool))
    .catch(error => {
      if (error.name === 'ValidationError') {
        return next(createError(400, error, { expose: true }));
      }
      return next(createError(500, error, { expose: false }));
    });

}

function deleteTool (req, res, next) {
  
  const id = req.params.id;

  const query = Tool.findByIdAndRemove(id);

  return query.exec()
    .then(() => res.json({}))
    .catch(error => {
      if (error.name === 'CastError') {
        return next(createError(404, `Tool ID ${id} was not found`, { expose: true }));
      }
      return next(error);
    });

}

module.exports = {
  getTools,
  createTool,
  deleteTool
};