import { RoutPath } from '@common/enums/app/route-path.enum';
import { sendVerificationLink } from '@controllers/mail_varification/send_link';
import { Router } from 'express';

const activateLinkRouter = Router();

activateLinkRouter.get(RoutPath.SEND_ACTIVATE_LINK, sendVerificationLink);

export { activateLinkRouter };
