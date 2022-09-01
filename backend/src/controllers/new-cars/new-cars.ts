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
    const userId = req.body.tokenPayload ? req.body.tokenPayload.sub : '';
    const newCars = await newCarsService.getNewCars(limit, userId);
    res.status(httpStatus.OK).json(newCars);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    next(error);
  }
};

export { getNewCars };
