import { NextFunction, Request, Response } from 'express';
import httpContext from 'express-http-context';

/**
 * Add the request's ID to the httpContext.
 */
export const requestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const requestId = req.rid;
  httpContext.set('rid', requestId);

  next();
};
