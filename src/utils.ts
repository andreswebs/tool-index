import { Server } from 'node:http';
import { signals } from './constants';
import debugSetup from 'debug';

const debug = debugSetup('server');

/**
 * Handle linux signals
 */
function handleSignals(server: Server) {
  const shutdown = (signal: string, value: number) => {
    server.close(() => {
      debug(`stopped by ${signal}`);
      process.exit(128 + value);
    });
  };

  Object.keys(signals).forEach((signal) => {
    process.on(signal, () => {
      shutdown(signal, signals[signal]);
    });
  });
}

export { handleSignals };
