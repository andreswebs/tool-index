import { Server } from 'node:http';
import { signals } from './constants';
import { provider } from './tracer';
import debugSetup from 'debug';

const debug = debugSetup('server');

/**
 * Handle linux signals
 */
function handleSignals(server: Server) {
  const shutdown = async (signal: string, value: number) => {
    await provider.shutdown();
    server.close(() => {
      debug(`stopped by ${signal}`);
      process.exit(128 + value);
    });
  };

  Object.keys(signals).forEach((signal) => {
    process.on(signal, async () => {
      await shutdown(signal, signals[signal]);
    });
  });
}

export { handleSignals };
