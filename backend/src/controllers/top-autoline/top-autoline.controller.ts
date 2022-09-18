import * as topAutolineService from '@services/top-autoline/top-autoline.service';
import httpStatus from 'http-status-codes';

import type { TypedRequestQuery } from '@common/types/controller/controller';
import type { NextFunction, Response } from 'express';

const getTopAutolineCarsList = async (
  req: TypedRequestQuery<Record<string, never>>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await topAutolineService.getTopAutolineCarsList();
    res.json(result).status(httpStatus.OK);
  } catch (error) {
    if (error instanceof Error) {
      res.sendStatus(httpStatus.BAD_REQUEST);
    }
    next(error);
  }
};

export { getTopAutolineCarsList };
