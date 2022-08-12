import { mailSend } from '@services/mail_verification/send.service';
import * as userSecurityService from '@services/mail_verification/user_security.service';

import { generateMailToken } from '../../services/mail_verification/token.service';

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
    const token = generateMailToken({
      email,
      isActivated: false,
    });
    await userSecurityService.changeMailToken(user.id, token);
    mailSend(email);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { sendMailAgain };
