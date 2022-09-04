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
    const carsIds = cars?.result.search_result.ids;
    const carPosters = carsIds?.map((car) => getCarById(car));
    Promise.all(carPosters as readonly unknown[]).then((result) =>
      res.json(result),
    );
  } catch (error) {
    next(error);
  }
};

export { whereBuy };
