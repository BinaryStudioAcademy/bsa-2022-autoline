import { getComplectations } from '@controllers/complectations/complectations.controller';
import { userAuthMiddleware } from '@middlewares/middlewares';
import { Router } from 'express';

const PATH = '/complectations';

const complectationsRouter = Router();

complectationsRouter.get(`${PATH}`, userAuthMiddleware, getComplectations);

export { complectationsRouter };
