import { getComplectationsById } from '@services/complectations/complectations.service';
import httpStatus from 'http-status-codes';

import type { TypedRequestQuery } from '@common/types/controller/controller';
import type { NextFunction, Response } from 'express';

type ModelIdInput = {
  complectationId: string;
};

const getComplectations = async (
  req: TypedRequestQuery<ModelIdInput>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { complectationId } = req.query;
    const ResponseDto = await getComplectationsById(complectationId);
    res.json(ResponseDto).status(httpStatus.CREATED);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.sendStatus(404);
    }
    next(error);
  }
};

export { getComplectations };
