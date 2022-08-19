import { CarsSearchParams } from '@autoline/shared';
import { TypedRequestQuery } from '@common/types/controller/controller';
import { getCarsAutoRia } from '@helpers/cars/api-autoria.helper';
import * as carsService from '@services/cars/cars-search.service';
import { NextFunction, Response } from 'express';

const carsSearch = async (
  req: TypedRequestQuery<CarsSearchParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const carsData = await carsService.carsSearch(req.query);
    const autoRiaCarsData = await getCarsAutoRia(carsData);

    res.json(autoRiaCarsData);
  } catch (error) {
    if (error instanceof Error && error.message === 'NotFoundError') {
      res.json([]);
    } else {
      next(error);
    }
  }
};

export { carsSearch };
