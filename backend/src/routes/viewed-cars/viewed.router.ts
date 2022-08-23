import * as viewedCarController from '@controllers/viewed-cars/viewed-cars.controller';
import { Router } from 'express';

const PATH = '/reviewed';

const viewedCarsRouter = Router();

viewedCarsRouter.get(`${PATH}/:userId`, viewedCarController.getList);

viewedCarsRouter.post(`${PATH}/:userId`, viewedCarController.setCar);

export { viewedCarsRouter };
