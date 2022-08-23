import { getModelById } from '@controllers/model/model.controller';
import { Router } from 'express';

const PATH = '/model';

const modelRouter = Router();

modelRouter.get(`${PATH}`, getModelById);

export { modelRouter };
