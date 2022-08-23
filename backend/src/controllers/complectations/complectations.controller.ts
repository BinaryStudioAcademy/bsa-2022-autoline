import { getComplectationsByModelId } from '@services/complectations/complectations.service';
import httpStatus from 'http-status-codes';

import type { TypedRequestQuery } from '@common/types/controller/controller';
import type { NextFunction, Response } from 'express';

type ModelIdInput = {
  modelId?: string | undefined;
};

const getComplectations = async (
  req: TypedRequestQuery<ModelIdInput>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { modelId } = req.body;
    const ResponseDto = await getComplectationsByModelId(modelId);
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
