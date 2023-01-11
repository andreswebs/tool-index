const serviceName = 'tool-index-api';

const signals = {
  SIGHUP: 1,
  SIGINT: 2,
  SIGTERM: 15,
};

const port = process.env.PORT || '3000';

const otelEnabled: boolean = (() => {
  if (String(process.env.APP_OTEL_ENABLED).toLowerCase() === 'false') {
    return false;
  }
  return process.env.APP_OTEL_ENABLED ? true : false;
})();

export { serviceName, port, signals, otelEnabled };
