const serviceName = 'tool-index-api';

const signals = {
  SIGHUP: 1,
  SIGINT: 2,
  SIGTERM: 15,
};

const port = process.env.PORT || '3000';

export { serviceName, port, signals };
