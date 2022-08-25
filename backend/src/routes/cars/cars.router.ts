import {
  carsSearchAutoria,
  getBrands,
  getModelsOfBrand,
  getUsedOptions,
  getCitiesOfRegion,
} from '@controllers/cars/cars.controller';
import { Router } from 'express';

const PATH = '/cars';

const carsRouter = Router();

carsRouter.get(`${PATH}/search-autoria`, carsSearchAutoria);

carsRouter.get(`${PATH}/brands`, getBrands);

carsRouter.get(`${PATH}/brand/:id/models`, getModelsOfBrand);

carsRouter.get(`${PATH}/options`, getUsedOptions);

carsRouter.get(`${PATH}/region/:id/cities`, getCitiesOfRegion);

export { carsRouter };
