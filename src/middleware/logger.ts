import { Request, Response, NextFunction } from 'express';

/**
 * Simple logs: `<method> <route> <status> <elapsed time> ms - <content length> bytes`
 */
function logger(req: Request, res: Response, next: NextFunction) {
  const start = process.hrtime();
  res.on('finish', function onFinish() {
    const elapsed = process.hrtime(start);
    const elapsedms = elapsed[0] * 1e3 + elapsed[1] * 1e-6;
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${elapsedms.toFixed(
        3
      )} ms - ${res.getHeader('Content-Length')} bytes`
    );
  });
  next();
}

export default logger;
