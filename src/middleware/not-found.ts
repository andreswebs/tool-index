import { Request, Response, NextFunction } from 'express';
import { HTTPError } from '../errors';

/**
 * Catch inexistent routes and pass 404 to the error handler
 */
function notFound(_req: Request, _res: Response, next: NextFunction) {
  return next(new HTTPError(404, 'Not Found'));
}

export default notFound;
