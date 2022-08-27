import {
  carsSearchAutoria,
  getBrands,
  getModelsOfBrand,
  getUsedOptions,
  carsSearchLocal,
} from '@controllers/cars/cars.controller';
import { Router } from 'express';

const PATH = '/cars';

const carsRouter = Router();

carsRouter.get(`${PATH}/search`, carsSearchLocal);

carsRouter.get(`${PATH}/search-autoria`, carsSearchAutoria);

carsRouter.get(`${PATH}/brands`, getBrands);

carsRouter.get(`${PATH}/brand/:id/models`, getModelsOfBrand);

carsRouter.get(`${PATH}/options`, getUsedOptions);

export { carsRouter };
