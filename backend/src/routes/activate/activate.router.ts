import { activate } from '@controllers/mail_varification/varification';
import { Router } from 'express';

const activateRouter = Router();

activateRouter.get('/activate/:link', activate);

export { activateRouter };
