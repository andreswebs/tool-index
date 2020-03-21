const createError = require('http-errors');

// catch inexistent routes and pass 404 to the error handler
function notFound (req, res, next) {
  return next(createError(404));
}

module.exports = notFound;