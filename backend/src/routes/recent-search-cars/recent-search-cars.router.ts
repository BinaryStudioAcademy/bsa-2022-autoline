import * as recentSearchController from '@controllers/recent-search-cars/recent-search-cars.controller';
import { userAuthMiddleware } from '@middlewares/middlewares';
import { Router } from 'express';

const PATH = '/recent-search';

const recentSearchCarsRouter = Router();

recentSearchCarsRouter.get(
  `${PATH}`,
  userAuthMiddleware,
  recentSearchController.getRecentSearchCars,
);

recentSearchCarsRouter.post(
  `${PATH}`,
  userAuthMiddleware,
  recentSearchController.addCarToRecentSearch,
);

export { recentSearchCarsRouter };
