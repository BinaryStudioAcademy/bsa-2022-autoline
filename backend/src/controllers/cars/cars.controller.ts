import { CarsSearchParams } from '@autoline/shared';
import {
  TypedRequestParams,
  TypedRequestQuery,
} from '@common/types/controller/controller';
import { getCarsAutoRia } from '@helpers/cars/api-autoria.helper';
import * as carsSearchService from '@services/cars/cars-search.service';
import * as carsService from '@services/cars/cars.service';
import { NextFunction, Request, Response } from 'express';

const carsSearchAutoria = async (
  req: TypedRequestQuery<CarsSearchParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const carsData = await carsSearchService.carsSearchAutoria(req.query);
    const autoRiaCarsData = await getCarsAutoRia(carsData);

    res.json(autoRiaCarsData);
  } catch (error) {
    if (error instanceof Error && error.message === 'NotFoundError') {
      res.json([]);
    } else {
      next(error);
    }
  }
};

const getBrands = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const brands = await carsService.getBrands();
    res.json(brands);
  } catch (error) {
    next(error);
  }
};

const getModelsOfBrand = async (
  req: TypedRequestParams<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const models = await carsService.getModels(req.params.id);
    res.json(models);
  } catch (error) {
    next(error);
  }
};

const getUsedOptions = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const models = await carsService.getUsedOptions();
    res.json(models);
  } catch (error) {
    next(error);
  }
};

export { carsSearchAutoria, getBrands, getModelsOfBrand, getUsedOptions };
