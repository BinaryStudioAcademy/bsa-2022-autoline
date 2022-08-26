import { TypedRequestParams } from '@common/types/controller/controller';
import * as locationService from '@services/location/location.service';
import { NextFunction, Response } from 'express';

const getCitiesOfRegion = async (
  req: TypedRequestParams<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const cities = await locationService.getCities(req.params.id);
    res.json(cities);
  } catch (error) {
    next(error);
  }
};

export { getCitiesOfRegion };
