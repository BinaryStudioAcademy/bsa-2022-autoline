import { RoutPath } from '@common/enums/app/route-path.enum';
import { sendVerificationLink } from '@controllers/mail-verification/send-link';
import { Router } from 'express';

const activateLinkRouter = Router();

activateLinkRouter.post(RoutPath.SEND_ACTIVATE_LINK, sendVerificationLink);

export { activateLinkRouter };
