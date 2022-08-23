import {
  carsWithPrices,
  carsWithBrandes,
} from '@helpers/new-cars/new-cars-helper';
import httpStatus from 'http-status-codes';

import type { Response, NextFunction, Request } from 'express';

const newCars = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const newCars = await carsWithPrices();
    const carsWhithBrand = await carsWithBrandes(newCars);
    res.status(httpStatus.OK).json(carsWhithBrand);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { newCars };
