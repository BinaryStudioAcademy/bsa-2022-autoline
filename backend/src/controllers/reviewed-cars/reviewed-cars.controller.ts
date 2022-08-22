import * as reviewedCarsService from '@services/reviewed-cars/reviewed-cars.service';
import httpStatus from 'http-status-codes';

import type {
  setViewedCarRequest,
  setViewedCarResponse,
} from '@autoline/shared';
import type { TypedRequestQuery } from '@common/types/controller/controller';
import type { getViewedCarsListResponse } from '@common/types/types';
import type { WishlistInput } from '@common/types/types';
import type { NextFunction, Response } from 'express';

const getList = async (
  req: TypedRequestQuery<WishlistInput>,
  res: Response<(getViewedCarsListResponse | null | undefined)[]>,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId } = req.params;
    const result = await reviewedCarsService.getList(userId);
    res.json(result).status(httpStatus.OK);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.sendStatus(400);
    }
    next(error);
  }
};

const setCar = async (
  req: TypedRequestQuery<setViewedCarRequest>,
  res: Response<setViewedCarResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { modelId, complectationId } = req.query;

    const reviewedCarsList = {
      userId,
      modelId,
      complectationId,
    };

    const result = await reviewedCarsService.setCar(reviewedCarsList);
    res.json(result).status(httpStatus.CREATED);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.sendStatus(400);
    }
    next(error);
  }
};

export { getList, setCar };
