import { TokenPayload } from '@autoline/shared';
import {
  TypedRequest,
  TypedRequestBody,
} from '@common/types/controller/controller';
import { ComparisonType } from '@prisma/client';
import * as comparisonsService from '@services/comparisons/comparisons.service';
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status-codes';

const addCarToComparison = async (
  req: TypedRequestBody<{
    complectationId: string;
    tokenPayload: TokenPayload;
  }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const comparison = await comparisonsService.addCarToComparison({
      complectationId: req.body.complectationId,
      userId: req.body.tokenPayload.sub,
    });
    res.status(httpStatus.CREATED).json(comparison);
  } catch (error) {
    next(error);
  }
};

const changeComparisonType = async (
  req: TypedRequestBody<{
    type: ComparisonType;
    tokenPayload: TokenPayload;
  }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const comparison = await comparisonsService.changeComparisonType({
      type: req.body.type,
      userId: req.body.tokenPayload.sub,
    });
    res.status(httpStatus.OK).json(comparison);
  } catch (error) {
    next(error);
  }
};

const clearComparison = async (
  req: TypedRequestBody<{
    tokenPayload: TokenPayload;
  }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const comparison = await comparisonsService.clearComparison(
      req.body.tokenPayload.sub,
    );
    res.status(httpStatus.OK).json(comparison);
  } catch (error) {
    next(error);
  }
};

const deleteCarFromComparison = async (
  req: TypedRequest<
    { complectationId: string },
    { tokenPayload: TokenPayload }
  >,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const comparison = await comparisonsService.deleteCarFromComparison({
      complectationId: req.params.complectationId,
      userId: req.body.tokenPayload.sub,
    });
    res.status(httpStatus.OK).json(comparison);
  } catch (error) {
    next(error);
  }
};

const getActiveComparisonCars = async (
  req: TypedRequestBody<{ tokenPayload: TokenPayload }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const comparison = await comparisonsService.getActiveComparisonCars(
      req.body.tokenPayload.sub,
    );
    res.status(httpStatus.OK).json(comparison);
  } catch (error) {
    next(error);
  }
};

export {
  addCarToComparison,
  changeComparisonType,
  clearComparison,
  deleteCarFromComparison,
  getActiveComparisonCars,
};
