import {
  AuthRequest,
  AuthTypedRequestBody,
  AuthTypedRequestParams,
} from '@common/types/controller/controller';
import { ComparisonType } from '@prisma/client';
import * as comparisonsService from '@services/comparisons/comparisons.service';
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status-codes';

const addCarToComparison = async (
  req: AuthTypedRequestBody<{
    complectationId: string;
  }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const comparison = await comparisonsService.addCarToComparison({
      complectationId: req.body.complectationId,
      userId: req.tokenPayload.sub,
    });
    res.status(httpStatus.CREATED).json(comparison);
  } catch (error) {
    next(error);
  }
};

const changeComparisonType = async (
  req: AuthTypedRequestBody<{
    type: ComparisonType;
  }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const comparison = await comparisonsService.changeComparisonType({
      type: req.body.type,
      userId: req.tokenPayload.sub,
    });
    res.status(httpStatus.OK).json(comparison);
  } catch (error) {
    next(error);
  }
};

const clearComparison = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const comparison = await comparisonsService.clearComparison(
      req.tokenPayload.sub,
    );
    res.status(httpStatus.OK).json(comparison);
  } catch (error) {
    next(error);
  }
};

const deleteCarFromComparison = async (
  req: AuthTypedRequestParams<{ complectationId: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const comparison = await comparisonsService.deleteCarFromComparison({
      complectationId: req.params.complectationId,
      userId: req.tokenPayload.sub,
    });
    res.status(httpStatus.OK).json(comparison);
  } catch (error) {
    next(error);
  }
};

const getActiveComparisonCars = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const comparison = await comparisonsService.getActiveComparisonCars(
      req.tokenPayload.sub,
    );
    res.status(httpStatus.OK).json(comparison);
  } catch (error) {
    next(error);
  }
};

const getActiveComparisonStatus = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const comparison = await comparisonsService.getActiveComparisonStatus(
      req.tokenPayload.sub,
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
  getActiveComparisonStatus,
};
