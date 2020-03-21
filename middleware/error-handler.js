const debug = require('debug')('errorHandler');
const statusCodes = require('http').STATUS_CODES;

// forward errors sent by the controller, or default to 500 Internal Server Error
function errorHandler(err, req, res, next) {
  
  debug(err.toString());

  // error response
  res.status(err.status || 500);
  res.json({ error: `${err.expose ? err.message : statusCodes[err.status || 500]}` });
}

module.exports = errorHandler;