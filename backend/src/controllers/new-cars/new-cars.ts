import { newerCars } from '@helpers/new-cars/new-cars-helper.ts';
import httpStatus from 'http-status-codes';

import type { Response, NextFunction, Request } from 'express';

const newCars = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const newCars = await newerCars(4);
    res.status(httpStatus.OK).json(newCars);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { newCars };
