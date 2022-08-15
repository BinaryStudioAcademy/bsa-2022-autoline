import { CarsSearchParams } from '@autoline/shared';
import { TypedRequestQuery } from '@common/types/controller/controller';
import { getCarsAutoRia } from '@helpers/cars/api_autoria.helper';
import * as carsService from '@services/cars/carsSearch.service';
import { NextFunction, Response } from 'express';

const carsSearch = async (
  req: TypedRequestQuery<CarsSearchParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const carsData = await carsService.carsSearch(req.query);
    const AutoRiaCarsData = await getCarsAutoRia(carsData);
    res.json(AutoRiaCarsData);
  } catch (error) {
    next(error);
  }
};

export { carsSearch };
