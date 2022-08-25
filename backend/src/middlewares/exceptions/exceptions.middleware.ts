import httpStatus from 'http-status-codes';

import type { NextFunction, Request, Response } from 'express';

export const errorsHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(httpStatus.BAD_REQUEST).json({
    error,
    message: error.message,
  });
  return;
};
