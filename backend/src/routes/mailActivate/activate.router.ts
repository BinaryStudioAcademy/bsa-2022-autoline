import { RoutPath } from '@common/enums/app/route-path.enum';
import { activateMail } from '@controllers/mail_varification/varification';
import { Router } from 'express';

const activateMailRouter = Router();

activateMailRouter.get(RoutPath.MAIL_ACTIVATE, activateMail);

export { activateMailRouter };
