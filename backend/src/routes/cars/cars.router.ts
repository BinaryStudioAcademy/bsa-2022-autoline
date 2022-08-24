import {
  carsSearch,
  getBrands,
  getModelsOfBrand,
  getUsedOptions,
} from '@controllers/cars/cars.controller';
import { Router } from 'express';

const PATH = '/cars';

const carsRouter = Router();

carsRouter.get(`${PATH}/search`, carsSearch);

carsRouter.get(`${PATH}/brands`, getBrands);

carsRouter.get(`${PATH}/brand/:id/models`, getModelsOfBrand);

carsRouter.get(`${PATH}/options`, getUsedOptions);

export { carsRouter };
