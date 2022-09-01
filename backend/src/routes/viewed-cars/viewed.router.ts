import * as viewedCarController from '@controllers/viewed-cars/viewed-cars.controller';
import { userAuthMiddleware } from '@middlewares/middlewares';
import { Router } from 'express';

const PATH = '/viewed';

const viewedCarsRouter = Router();

viewedCarsRouter.get(
  `${PATH}`,
  userAuthMiddleware,
  viewedCarController.getViewedCarsList,
);

viewedCarsRouter.post(
  `${PATH}`,
  userAuthMiddleware,
  viewedCarController.addCarToViewed,
);

export { viewedCarsRouter };
