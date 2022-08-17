import { RoutPath } from '@common/enums/app/route-path.enum';
import { activateMail } from '@controllers/mail_varification/verification';
import { Router } from 'express';

const activateRouter = Router();

activateRouter.get(RoutPath.MAIL_ACTIVATE, activateMail);

export { activateRouter };
