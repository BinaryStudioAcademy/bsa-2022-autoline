import { WhereBuyRequestQuery } from '@common/types/types';
import {
  getCarsAutoRia,
  getCarByIdRia,
} from '@helpers/cars/api-autoria.helper';
import { carsSearchAutoria } from '@services/cars/cars-search.service';
import { Response, NextFunction } from 'express';

import type { TypedRequestQuery } from '@common/types/controller/controller';

const whereToBuy = async (
  req: TypedRequestQuery<WhereBuyRequestQuery>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const page = req.query.page;
    const complectationId = req.query.id;
    const countpage = +req.query.countpage;
    const querysForRequest = await carsSearchAutoria(
      complectationId,
      page,
      countpage,
    );
    const allAdverts = await getCarsAutoRia(querysForRequest);
    const advertsId = allAdverts?.result.search_result.ids;
    const advertsInfo = advertsId?.map((car) => getCarByIdRia(car));
    Promise.all(advertsInfo as readonly unknown[]).then((result) =>
      res.json(result),
    );
  } catch (error) {
    next(error);
  }
};

export { whereToBuy };
