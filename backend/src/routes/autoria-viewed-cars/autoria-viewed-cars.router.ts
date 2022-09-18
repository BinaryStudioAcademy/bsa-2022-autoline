import * as autoriaViewedCarController from '@controllers/autoria-viewed-cars/autoria-viewed-cars.controller';
import { userAuthMiddleware } from '@middlewares/middlewares';
import { Router } from 'express';

const PATH = '/viewed-autoria';

const autoriaViewedCarsRouter = Router();

autoriaViewedCarsRouter.post(
  `${PATH}`,
  userAuthMiddleware,
  autoriaViewedCarController.addCarToAutoRiaViewed,
);

export { autoriaViewedCarsRouter };
