import httpStatus from 'http-status-codes';

import type { TypedRequestQuery } from '@common/types/controller/controller';
import type { Response, NextFunction } from 'express';

type NewCarsRequestQuery = {
  limit: string;
};
const whereBuy = async (
  req: TypedRequestQuery<NewCarsRequestQuery>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    console.log('Hi');
    res.status(httpStatus.OK).json('Hi');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { whereBuy };
