import { getComplectationsById } from '@services/complectations/complectations.service';
import httpStatus from 'http-status-codes';

import type { TypedRequestQuery } from '@common/types/controller/controller';
import type { NextFunction, Response } from 'express';

type ComplectationsInput = {
  complectationId: string;
  userId: string;
  modelId: string;
};

const getComplectations = async (
  req: TypedRequestQuery<ComplectationsInput>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.body.tokenPayload.sub;
    const { complectationId, modelId } = req.query;
    const input: ComplectationsInput = {
      userId,
      modelId,
      complectationId,
    };
    const ResponseDto = await getComplectationsById(input);
    res.json(ResponseDto).status(httpStatus.OK);
  } catch (error) {
    if (error instanceof Error && error.message === 'NotFoundError') {
      res.sendStatus(httpStatus.NOT_FOUND);
    }
    next(error);
  }
};

export { getComplectations };
