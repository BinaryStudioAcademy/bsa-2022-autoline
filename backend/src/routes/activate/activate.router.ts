import { Router } from 'express';

import { emailActivate } from '../../controllers/email_validate';

const activateRouter = Router();

activateRouter.get('/activate/:link', emailActivate);

export { activateRouter };
