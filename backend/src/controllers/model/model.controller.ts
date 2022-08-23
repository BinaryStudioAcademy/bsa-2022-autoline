import { getModel } from '@services/model/model.service';
import httpStatus from 'http-status-codes';

import type { TypedRequestQuery } from '@common/types/controller/controller';
import type { NextFunction, Response } from 'express';

type ModelInput = {
  modelId?: string | undefined;
};

const getModelById = async (
  req: TypedRequestQuery<ModelInput>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { modelId } = req.body;
    const ResponseDto = await getModel(modelId);
    res.json(ResponseDto).status(httpStatus.CREATED);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.sendStatus(404);
    }
    next(error);
  }
};

export { getModelById };
