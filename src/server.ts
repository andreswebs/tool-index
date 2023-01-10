// Code in this file was adapted from boilerplate generated by express-generator

import http from 'http';
import app from './app';
import { handleSignals } from './utils';
import { port } from './constants';
import debugSetup from 'debug';

const debug = debugSetup('server');

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `pipe ${port}` : `port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug(`listening on ${bind}`);
}

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

app.set('port', normalizePort(port));

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

handleSignals(server);

export default server;
