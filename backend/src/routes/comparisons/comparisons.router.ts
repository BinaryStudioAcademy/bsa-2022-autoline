import * as comparisonsController from '@controllers/comparisons/comparisons.controller';
import { userAuthMiddleware } from '@middlewares/middlewares';
import { Router } from 'express';

const PATH = '/comparisons';

const comparisonsRouter = Router();

comparisonsRouter.post(
  PATH,
  userAuthMiddleware,
  comparisonsController.addCarToComparison,
);
comparisonsRouter.patch(
  PATH,
  userAuthMiddleware,
  comparisonsController.changeComparisonType,
);
comparisonsRouter.patch(
  `${PATH}/clear`,
  userAuthMiddleware,
  comparisonsController.clearComparison,
);
comparisonsRouter.delete(
  `${PATH}/:complectationId`,
  userAuthMiddleware,
  comparisonsController.deleteCarFromComparison,
);
comparisonsRouter.get(
  PATH,
  userAuthMiddleware,
  comparisonsController.getActiveComparisonCars,
);
comparisonsRouter.get(
  `${PATH}/status`,
  userAuthMiddleware,
  comparisonsController.getActiveComparisonStatus,
);
comparisonsRouter.get(
  `${PATH}/:type`,
  userAuthMiddleware,
  comparisonsController.getComparisonOptions,
);
export { comparisonsRouter };
