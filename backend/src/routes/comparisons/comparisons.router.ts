import * as comparisonsController from '@controllers/comparisons/comparisons.controller';
import { userAuthMiddleware } from '@middlewares/middlewares';
import { Router } from 'express';

const PATH = '/comparisons';

const comparisonsRouter = Router();

comparisonsRouter.post(PATH, comparisonsController.addCarToComparison);
comparisonsRouter.patch(PATH, comparisonsController.changeComparisonType);
comparisonsRouter.patch(`${PATH}/clear`, comparisonsController.clearComparison);
comparisonsRouter.delete(PATH, comparisonsController.deleteCarFromComparison);
comparisonsRouter.get(PATH, comparisonsController.getActiveComparisonCars);
comparisonsRouter.get(
  `${PATH}/general`,
  userAuthMiddleware,
  comparisonsController.getComparisonGeneralInfo,
);

export { comparisonsRouter };
