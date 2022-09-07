import { TokenPayload } from '@autoline/shared';
import {
  TypedRequest,
  TypedRequestBody,
  TypedRequestQuery,
  TypedRequestParams,
} from '@common/types/controller/controller';
import { ComparisonType, Type } from '@prisma/client';
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

const getActiveComparisonStatus = async (
  req: TypedRequestBody<{ tokenPayload: TokenPayload }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const comparison = await comparisonsService.getActiveComparisonStatus(
      req.body.tokenPayload.sub,
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
  getActiveComparisonStatus,
  getComparisonOptions,
  getComparisonGeneralInfo,
};
