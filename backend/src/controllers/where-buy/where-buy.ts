import { getCarsAutoRia, getCarById } from '@helpers/cars/api-autoria.helper';
import { carsSearchAutoria } from '@services/cars/cars-search.service';
import { Response, NextFunction } from 'express';

import type { TypedRequestQuery } from '@common/types/controller/controller';

type WhereBuyRequestQuery = {
  page: string;
  id: string;
};

const whereBuy = async (
  req: TypedRequestQuery<WhereBuyRequestQuery>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const page = req.query.page;
    const complectationId = req.query.id;
    const carProp = await carsSearchAutoria([complectationId], page);
    const cars = await getCarsAutoRia(carProp);
    const oneCar = await getCarById(
      cars?.result.search_result.ids[1] as string,
    );
    res.json(oneCar);
  } catch (error) {
    next(error);
  }
};

export { whereBuy };
