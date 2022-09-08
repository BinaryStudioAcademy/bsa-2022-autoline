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
  `${PATH}/info`,
  userAuthMiddleware,
  comparisonsController.getActiveComparisonCars,
);
comparisonsRouter.get(
  `${PATH}/status`,
  userAuthMiddleware,
  comparisonsController.getActiveComparisonStatus,
);
comparisonsRouter.get(
  `${PATH}/general`,
  userAuthMiddleware,
  comparisonsController.getComparisonGeneralInfo,
);

comparisonsRouter.get(
  `${PATH}/option/:type`,
  userAuthMiddleware,
  comparisonsController.getComparisonOptions,
);
comparisonsRouter.get(
  PATH,
  userAuthMiddleware,
  comparisonsController.getActiveComparison,
);
comparisonsRouter.patch(
  `${PATH}/position`,
  userAuthMiddleware,
  comparisonsController.updatePositions,
);

export { comparisonsRouter };
