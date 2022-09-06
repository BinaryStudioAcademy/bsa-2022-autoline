import * as viewedCarsService from '@services/viewed-cars/viewed-cars.service';
import httpStatus from 'http-status-codes';

import type {
  SetViewedCarRequestDto,
  GetViewedCarsRequestDto,
  GetViewedCarsResponse,
} from '@autoline/shared';
import type { TypedRequestQuery } from '@common/types/controller/controller';
import type { NextFunction, Response } from 'express';

const getViewedCarsList = async (
  req: TypedRequestQuery<GetViewedCarsRequestDto<string>>,
  res: Response<GetViewedCarsResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.tokenPayload?.sub as string;
    const { skip, take } = req.query;
    const requestDataDto = {
      userId,
      skip: +(skip || 0),
      take: +(take || 0),
    };
    const result = await viewedCarsService.getViewedCarsList(requestDataDto);
    res.json(result).status(httpStatus.OK);
  } catch (error) {
    if (error instanceof Error) {
      res.sendStatus(400);
    }
    next(error);
  }
};

const addCarToViewed = async (
  req: TypedRequestQuery<SetViewedCarRequestDto>,
  res: Response<void>,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.tokenPayload?.sub as string;
    const { modelId, complectationId } = req.query;

    const viewedCar = {
      userId,
      modelId,
      complectationId,
    };

    await viewedCarsService.addCarToViewed(viewedCar);
    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    if (error instanceof Error) {
      res.sendStatus(400);
    }
    next(error);
  }
};

export { getViewedCarsList, addCarToViewed };
