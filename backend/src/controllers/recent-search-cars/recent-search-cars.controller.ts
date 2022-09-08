import { TokenPayload } from '@autoline/shared';
import * as recentSearchCarsService from '@services/recent-search-cars/resent-search-cars.service';
import httpStatus from 'http-status-codes';

import type { RecentSearchCarsResponse } from '@autoline/shared/common/types/types';
import type { TypedRequestBody } from '@common/types/controller/controller';
import type { NextFunction, Response } from 'express';

const getRecentSearchCars = async (
  req: TypedRequestBody<{ tokenPayload: TokenPayload }>,
  res: Response<RecentSearchCarsResponse[]>,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.body.tokenPayload.sub;
    const result = await recentSearchCarsService.getRecentSearchCars(userId);
    res.json(result).status(httpStatus.OK);
  } catch (error) {
    next(error);
  }
};

const addCarToRecentSearch = async (
  req: TypedRequestBody<{ tokenPayload: TokenPayload; modelId: string }>,
  res: Response<void>,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.body.tokenPayload.sub;
    const { modelId } = req.body;

    const recentSearchCar = {
      userId,
      modelId,
    };

    await recentSearchCarsService.addCarToRecentSearch(recentSearchCar);
    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
};

export { getRecentSearchCars, addCarToRecentSearch };