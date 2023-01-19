import { STATUS_CODES } from 'node:http';
import { Request, Response, NextFunction } from 'express';
import { context, trace, SpanStatusCode } from '@opentelemetry/api';
import { HTTPError } from '../errors';

/**
 * Log errors and forward exposable info back to client
 */
function errorHandler(
  err: Error | HTTPError,
  _req: Request,
  res: Response,
  _next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  const isHTTPError = err instanceof HTTPError;
  const status = isHTTPError ? err.status : 500;

  const msg = isHTTPError
    ? err.expose
      ? err.message
      : STATUS_CODES[err.status]
    : STATUS_CODES[500];

  const cause = isHTTPError ? (err.expose ? err.cause : undefined) : undefined;

  const errorResponse = {
    error: `${err.name}: ${msg}`,
    cause,
  };

  const errorLog = {
    error: `${err.name}: ${err.message}`,
    cause: err.cause,
    stack: err.stack,
  };

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
    }
  } catch (e) {
    console.error(
      JSON.stringify({
        error: `${e.name}: ${e.message}`,
        stack: e.stack,
      })
    );
  }

  // error log
  console.error(JSON.stringify(errorLog));

  // error response
  return res.status(status).json(errorResponse);
}

export default errorHandler;
