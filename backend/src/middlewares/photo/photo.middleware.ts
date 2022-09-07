import { ErrorMessage, userPhotoSchema } from '@autoline/shared';
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status-codes';

const photoMiddleware = async (
  /* eslint-disable-next-line */
  req: any,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await userPhotoSchema.validate(req.files);
    next();
  } catch (err) {
    const { message } = err as ErrorMessage;
    res.status(httpStatus.FORBIDDEN).json({ error: message });
    next(err);
  }
};

export { photoMiddleware };
