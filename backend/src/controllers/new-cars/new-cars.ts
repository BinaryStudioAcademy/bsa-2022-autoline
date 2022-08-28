import * as newCarsService from '@services/new-cars/new-cars.service';
import httpStatus from 'http-status-codes';

import type { TypedRequestQuery } from '@common/types/controller/controller';
import type { Response, NextFunction } from 'express';

type NewCarsRequestQuery = {
  limit: string;
};
const getNewCars = async (
  req: TypedRequestQuery<NewCarsRequestQuery>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const limit = +req.query.limit;
    const newCars = await newCarsService.getNewCars(limit);
    res.status(httpStatus.OK).json(newCars);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { getNewCars };
