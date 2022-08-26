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
    const userId = req.body.tokenPayload.sub;
    const { complectationId } = req.query;
    const ResponseDto = await getComplectationsById(complectationId, userId);
    res.json(ResponseDto).status(httpStatus.OK);
  } catch (error) {
    if (error instanceof Error && error.message === 'NotFoundError') {
      res.sendStatus(httpStatus.NOT_FOUND);
    }
    next(error);
  }
};

export { getComplectations };
