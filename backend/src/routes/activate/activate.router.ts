import { activate } from '@controllers/email_validate';
import { Router } from 'express';

const activateRouter = Router();

activateRouter.get('/activate/:link', activate);

export { activateRouter };
