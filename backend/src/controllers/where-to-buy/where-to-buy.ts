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
    const advertsIds = allAdverts.result.search_result.ids;
    const advertsInfo = await Promise.all(
      advertsIds.map((car) => getCarByIdRia(car)),
    );
    res.json(advertsInfo);
  } catch (error) {
    next(error);
  }
};

export { whereToBuy };
