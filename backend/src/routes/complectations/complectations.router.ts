import {
  getComplectations,
  getComlectationShortInfoById,
} from '@controllers/complectations/complectations.controller';
import { userAuthMiddleware } from '@middlewares/middlewares';
import { Router } from 'express';

enum Complectation {
  ALL = '/complectations',
  BYID = '/complectation/:complectationId',
}

const complectationsRouter = Router();

complectationsRouter.get(
  `${Complectation.ALL}`,
  userAuthMiddleware,
  getComplectations,
);

complectationsRouter.get(
  `${Complectation.BYID}`,
  userAuthMiddleware,
  getComlectationShortInfoById,
);

export { complectationsRouter };
