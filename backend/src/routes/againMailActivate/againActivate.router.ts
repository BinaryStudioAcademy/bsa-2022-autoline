import { RoutPath } from '@common/enums/app/route-path.enum';
import { sendMailAgain } from '@controllers/mail_varification/send_mail_again';
import { Router } from 'express';

const sendAgainRouter = Router();

sendAgainRouter.get(RoutPath.MAIL_ACTIVATE_AGAIN, sendMailAgain);

export { sendAgainRouter };
