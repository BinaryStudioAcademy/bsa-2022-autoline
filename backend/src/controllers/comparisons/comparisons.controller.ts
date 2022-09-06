import {
  TypedRequestBody,
  TypedRequestQuery,
} from '@common/types/controller/controller';
import { ComparisonType } from '@prisma/client';
import * as comparisonsService from '@services/comparisons/comparisons.service';
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status-codes';

const addCarToComparison = async (
  req: TypedRequestBody<{ complectationId: string; userId: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const comparison = await comparisonsService.addCarToComparison(req.body);
    res.status(httpStatus.CREATED).json(comparison);
  } catch (error) {
    next(error);
  }
};

const changeComparisonType = async (
  req: TypedRequestBody<{
    type: ComparisonType;
    userId: string;
  }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const comparison = await comparisonsService.changeComparisonType(req.body);
    res.status(httpStatus.OK).json(comparison);
  } catch (error) {
    next(error);
  }
};

const clearComparison = async (
  req: TypedRequestBody<{
    userId: string;
  }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const comparison = await comparisonsService.clearComparison(
      req.body.userId,
    );
    res.status(httpStatus.OK).json(comparison);
  } catch (error) {
    next(error);
  }
};

const deleteCarFromComparison = async (
  req: TypedRequestQuery<{
    complectationId: string;
    userId: string;
  }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const comparison = await comparisonsService.deleteCarFromComparison(
      req.query,
    );
    res.status(httpStatus.OK).json(comparison);
  } catch (error) {
    next(error);
  }
};

const getActiveComparisonCars = async (
  req: TypedRequestQuery<{ userId: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const comparison = await comparisonsService.getActiveComparisonCars(
      req.query.userId.toString(),
    );
    res.status(httpStatus.OK).json(comparison);
  } catch (error) {
    next(error);
  }
};

const getComparisonGeneralInfo = async (
  req: TypedRequestQuery<{ userId: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.body.tokenPayload.sub;
    const comparison = await comparisonsService.getComparisonGeneralInfo(
      userId,
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
  getComparisonGeneralInfo,
};
