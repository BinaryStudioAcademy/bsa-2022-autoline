import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';

export const errorsHandler = (
  error: Error,
  req: Request,
  res: Response,
): void => {
  console.error(JSON.stringify(error), error.message);
  res.status(httpStatus.BAD_REQUEST).json({
    error,
    message: error.message,
  });
  return;
};
