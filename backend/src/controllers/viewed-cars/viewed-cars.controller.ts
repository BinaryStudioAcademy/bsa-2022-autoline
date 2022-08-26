import * as viewedCarsService from '@services/viewed-cars/viewed-cars.service';
import httpStatus from 'http-status-codes';

import type {
  setViewedCarRequest,
  setViewedCarResponse,
} from '@autoline/shared';
import type { TypedRequestQuery } from '@common/types/controller/controller';
import type {
  GetViewedCarsListResponse,
  GetViewedCarsListRequest,
} from '@common/types/types';
import type { NextFunction, Response } from 'express';

const getViewedCarsList = async (
  req: TypedRequestQuery<GetViewedCarsListRequest>,
  res: Response<GetViewedCarsListResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { skip, take } = req.query;
    const result = await viewedCarsService.getViewedCarsList(
      userId,
      +skip,
      +take,
    );
    res.json(result).status(httpStatus.OK);
  } catch (error) {
    if (error instanceof Error) {
      res.sendStatus(400);
    }
    next(error);
  }
};

const addCarToViewed = async (
  req: TypedRequestQuery<setViewedCarRequest>,
  res: Response<setViewedCarResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { modelId, complectationId } = req.query;

    const viewedCar = {
      userId,
      modelId,
      complectationId,
    };

    const result = await viewedCarsService.addCarToViewed(viewedCar);
    res.json(result).status(httpStatus.CREATED);
  } catch (error) {
    if (error instanceof Error) {
      res.sendStatus(400);
    }
    next(error);
  }
};

export { getViewedCarsList, addCarToViewed };
