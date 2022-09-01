import * as comparisonsController from '@controllers/comparisons/comparisons.controller';
import { Router } from 'express';

const PATH = '/comparisons';

const comparisonsRouter = Router();

comparisonsRouter.post(PATH, comparisonsController.addCarToComparison);
comparisonsRouter.patch(PATH, comparisonsController.changeComparisonType);
comparisonsRouter.patch(`${PATH}/clear`, comparisonsController.clearComparison);
comparisonsRouter.delete(PATH, comparisonsController.deleteCarFromComparison);
comparisonsRouter.get(PATH, comparisonsController.getActiveComparisonCars);

export { comparisonsRouter };
