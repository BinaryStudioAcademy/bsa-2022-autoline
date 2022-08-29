// import { getCarsAutoRia } from '@helpers/cars/api-autoria.helper';
import { carsSearchAutoria } from '@services/cars/cars-search.service';
import httpStatus from 'http-status-codes';

import type { TypedRequestQuery } from '@common/types/controller/controller';
import type { Response, NextFunction } from 'express';

type NewCarsRequestQuery = {
  limit: string;
};
const whereBuy = async (
  req: TypedRequestQuery<NewCarsRequestQuery>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    console.log('Hi');
    const carsS = await carsSearchAutoria({ category_id: 1 });
    // const cars = await getCarsAutoRia({ category_id: 1 });
    console.log(carsS);
    res.status(httpStatus.OK).json('Hi');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { whereBuy };
