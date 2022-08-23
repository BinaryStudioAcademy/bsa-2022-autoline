import { getComplectations } from '@controllers/complectations/complectations.controller';
import { Router } from 'express';

const PATH = '/complectations';

const complectationsRouter = Router();

complectationsRouter.get(`${PATH}`, getComplectations);

export { complectationsRouter };
