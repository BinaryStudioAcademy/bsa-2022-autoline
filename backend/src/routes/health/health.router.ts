import { getHealth } from '@controllers/health/health.controller';
import { Router } from 'express';

const PATH = '/health';

const healthRouter = Router();

healthRouter.get(`${PATH}`, getHealth);

export { healthRouter };
