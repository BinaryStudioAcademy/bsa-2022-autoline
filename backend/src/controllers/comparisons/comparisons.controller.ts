import {
  TypedRequestQuery,
  TypedRequestBody,
  TypedRequestParams,
} from '@common/types/controller/controller';
import { getCarsAutoRia } from '@helpers/helpers';
import { ComparisonType, Type } from '@prisma/client';
import { carsSearchAutoria } from '@services/cars/cars-search.service';
import * as comparisonsService from '@services/comparisons/comparisons.service';
import { Request, NextFunction, Response } from 'express';
import httpStatus from 'http-status-codes';

const addCarToComparison = async (
  req: TypedRequestBody<{
    complectationId: string | string[];
    lastPosition?: number;
  }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { complectationId, lastPosition } = req.body;

    const complectationIds =
      typeof complectationId === 'string' ? [complectationId] : complectationId;

    const comparison = await comparisonsService.addCarsToComparison({
      complectationIds,
      lastPosition,
      userId: req.tokenPayload.sub,
    });
    res.status(httpStatus.CREATED).json(comparison);
  } catch (error) {
    next(error);
  }
};

const changeComparisonType = async (
  req: TypedRequestBody<{
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
  req: Request,
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
  req: TypedRequestParams<{ complectationId: string }>,
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
  req: Request,
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
  req: Request,
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

const getComparisonOptions = async (
  req: TypedRequestParams<{ type: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const options = await comparisonsService.getComparisonOptions(
      req.params.type as Type,
    );
    res.status(httpStatus.OK).json(options);
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
    const userId = req.tokenPayload.sub;
    const comparison = await comparisonsService.getComparisonGeneralInfo(
      userId,
    );
    res.status(httpStatus.OK).json(comparison);
  } catch (error) {
    next(error);
  }
};

const getActiveComparison = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const comparison = await comparisonsService.getActiveComparison(
      req.tokenPayload.sub,
    );
    res.status(httpStatus.OK).json(comparison);
  } catch (error) {
    next(error);
  }
};

const updatePositions = async (
  req: TypedRequestBody<{ positions: string[] }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const comparison = await comparisonsService.updatePositions(
      req.tokenPayload.sub,
      req.body.positions,
    );
    res.status(httpStatus.OK).json(comparison);
  } catch (error) {
    next(error);
  }
};

const getAdvertsCount = async (
  req: TypedRequestParams<{ complectationId: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const querysForRequest = await carsSearchAutoria({
      complectationId: req.params.complectationId,
      page: '0',
      countpage: 10,
    });
    const carsInfo = await getCarsAutoRia(querysForRequest);
    res.json(carsInfo.result.search_result.count);
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
  getComparisonOptions,
  getComparisonGeneralInfo,
  getActiveComparison,
  updatePositions,
  getAdvertsCount,
};
