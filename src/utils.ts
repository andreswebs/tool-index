import { Server } from 'node:http';
import { signals } from './constants';
import { provider } from './tracer';

/**
 * Handle linux signals
 */
function handleSignals(server: Server) {
  const shutdown = async (signal: string, value: number) => {
    await provider.shutdown();
    server.close(() => {
      console.log(`stopped by ${signal}`);
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
