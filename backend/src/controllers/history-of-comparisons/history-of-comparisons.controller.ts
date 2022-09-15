import * as comparisonHistoryService from '@services/history-of-comparisons/history-of-comparisons.service';
import httpStatus from 'http-status-codes';

import type { GetAllComparisonsResponse } from '@autoline/shared';
import type { NextFunction, Response, Request } from 'express';

const getAllComparisons = async (
  req: Request,
  res: Response<GetAllComparisonsResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.tokenPayload.sub;
    const result = await comparisonHistoryService.getAllComparisons({ userId });
    res.json(result).status(httpStatus.OK);
  } catch (error) {
    if (error instanceof Error) {
      res.sendStatus(400);
    }
    next(error);
  }
};

const changeActiveComparison = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.tokenPayload.sub;
    const comparisonId = req.params.id;
    const result = await comparisonHistoryService.changeActiveComparison({
      userId,
      comparisonId,
    });
    res.json(result).status(httpStatus.OK);
  } catch (error) {
    if (error instanceof Error) {
      res.sendStatus(400);
    }
    next(error);
  }
};

export { getAllComparisons, changeActiveComparison };
