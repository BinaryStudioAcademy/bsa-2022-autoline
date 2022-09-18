import * as autoriaViewedCarsService from '@services/autoria-viewed-cars/autoria-viewed-cars.service';
import httpStatus from 'http-status-codes';

import type { TypedRequestBody } from '@common/types/controller/controller';
import type { NextFunction, Response } from 'express';

interface CarToAutoRiaViewed {
  modelId: string;
  autoriaCode: string;
}

const addCarToAutoRiaViewed = async (
  req: TypedRequestBody<CarToAutoRiaViewed>,
  res: Response<void>,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.tokenPayload.sub as string;
    const { modelId, autoriaCode } = req.body;

    const viewedCar = {
      userId,
      modelId,
      autoriaCode,
    };

    await autoriaViewedCarsService.addCarToAutoRiaViewed(viewedCar);
    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    if (error instanceof Error) {
      res.sendStatus(400);
    }
    next(error);
  }
};

export { addCarToAutoRiaViewed };
