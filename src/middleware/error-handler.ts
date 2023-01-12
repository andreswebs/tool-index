import { STATUS_CODES } from 'node:http';
import { Request, Response, NextFunction } from 'express';
import { HTTPError } from '../errors';
import { context, trace, SpanStatusCode } from '@opentelemetry/api';
import debugSetup from 'debug';

const debug = debugSetup('errorHandler');

/**
 * Forward known errors back to client, or default to 500 Internal Server Error
 */
function errorHandler(
  err: Error | HTTPError,
  _req: Request,
  res: Response,
  _next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  debug(`${err.name}: ${err.message}`);

  const isHTTPError = err instanceof HTTPError;

  const status = isHTTPError ? err.status : 500;
  const msg = isHTTPError
    ? err.expose
      ? err.message
      : STATUS_CODES[err.status]
    : STATUS_CODES[500];

  try {
    // OTel: sample all errors
    const activeCtx = context.active();
    const currentSpan = trace.getSpan(activeCtx);
    if (currentSpan) {
      currentSpan.setAttributes({
        'sampling.priority': 1,
      });
      currentSpan.recordException(err);
      currentSpan.setStatus({ code: SpanStatusCode.ERROR });
      currentSpan.end();
    }
  } catch (e) {
    debug(`Error setting up OTel: ${e.message}`);
  }

  // error response
  return res.status(status).json({
    error: msg,
  });
}

export default errorHandler;
