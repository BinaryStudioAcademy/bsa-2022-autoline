import { HttpError } from '@dtos/execptions/error.dto';
import httpStatus from 'http-status-codes';

import type { NextFunction, Request, Response } from 'express';

export const errorsHandler = (
  error: Error | HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof HttpError) {
    res.status(error.code).json({ message: error.message });
    return;
  }

  res.status(httpStatus.BAD_REQUEST).json({
    error,
    message: error.message,
  });
  return;
};
