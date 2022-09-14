import {
  getComplectations,
  getComlectationShortInfoById,
} from '@controllers/complectations/complectations.controller';
import { Router } from 'express';

enum Complectation {
  ALL = '/complectations',
  BYID = '/complectation/:complectationId',
}

const complectationsRouter = Router();

complectationsRouter.get(`${Complectation.ALL}`, getComplectations);

complectationsRouter.get(`${Complectation.BYID}`, getComlectationShortInfoById);

export { complectationsRouter };
