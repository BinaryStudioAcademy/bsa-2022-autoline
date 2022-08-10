import { sendmail } from '@controllers/email_validate';
import { Router } from 'express';

const sendMailRouter = Router();

sendMailRouter.get('/send/mail', sendmail);

export { sendMailRouter };
