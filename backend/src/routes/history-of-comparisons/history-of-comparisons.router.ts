import * as comparisonHistoryController from '@controllers/history-of-comparisons/history-of-comparisons.controller';
import { userAuthMiddleware } from '@middlewares/middlewares';
import { Router } from 'express';

const PATH = '/history/comparisons';

const historyOfComparisonsRouter = Router();

historyOfComparisonsRouter.get(
  `${PATH}`,
  userAuthMiddleware,
  comparisonHistoryController.getAllComparisons,
);

historyOfComparisonsRouter.patch(
  `${PATH}/:id`,
  userAuthMiddleware,
  comparisonHistoryController.changeActiveComparison,
);

export { historyOfComparisonsRouter };
