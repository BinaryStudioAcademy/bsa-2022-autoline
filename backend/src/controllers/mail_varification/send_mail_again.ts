import * as userSecurityService from '@services/mail_verification/user_security.service';

import { sendMail } from '../../services/mail_verification/send_mail/sendLink';

import type { TypedRequestBody } from '@common/types/controller/controller';
import type { Response, NextFunction } from 'express';

type SendMailAgainBody = {
  email: string;
};

const sendMailAgain = async (
  req: TypedRequestBody<SendMailAgainBody>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await userSecurityService.getUserByEmail(email);
    if (!user) {
      return;
    }
    const userSecurity = await userSecurityService.getByUserId(user.id);
    if (!userSecurity?.email_activation_token) {
      return;
    }
    const token = await sendMail(email);
    await userSecurityService.changeMailToken(user.id, token);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { sendMailAgain };
