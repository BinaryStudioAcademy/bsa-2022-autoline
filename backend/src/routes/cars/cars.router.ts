import { carsSearch } from '@controllers/cars/cars.controller';
import { Router } from 'express';

const PATH = '/cars';

const carsRouter = Router();

carsRouter.get(`${PATH}/search`, carsSearch);

export { carsRouter };
