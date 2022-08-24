import * as viewedCarController from '@controllers/viewed-cars/viewed-cars.controller';
import { Router } from 'express';

const PATH = '/viewed';

const viewedCarsRouter = Router();

viewedCarsRouter.get(`${PATH}/:userId`, viewedCarController.getViewedCarsList);

viewedCarsRouter.post(`${PATH}/:userId`, viewedCarController.addCarToViewed);

export { viewedCarsRouter };
