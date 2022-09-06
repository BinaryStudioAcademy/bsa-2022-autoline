import { ErrorMessage } from '@autoline/shared';
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status-codes';

const photoMiddleware = async (
  /* eslint-disable */
  req: any,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (req.files) {
      const file = req.files.photo;
      const validation = ['image/jpeg', 'image/jpg', 'image/png'];
      const fileSize = Math.round(file.size / 1024);

      if (!validation.includes(file.type)) {
        throw new Error('This is not an Image File!');
      } else if (fileSize > 10240) {
        throw new Error('File too Big, please select a file less than 10mb');
      }

      next();
    }
  } catch (err) {
    const { message } = err as ErrorMessage;
    res.status(httpStatus.FORBIDDEN).json({ error: message });
    next(err);
  }
};

export { photoMiddleware };
