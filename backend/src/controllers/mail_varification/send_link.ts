import { sendMail } from '@services/mail_verification/send_mail/sendLink';
import { generateMailToken } from '@services/mail_verification/token.service';
import { getByEmail } from '@services/mail_verification/user_data.service/user';
import {
  updateMailToken,
  getByUserId,
} from '@services/mail_verification/user_data.service/user_security';

import type { TypedRequestBody } from '@common/types/controller/controller';
import type { Response, NextFunction } from 'express';

type MailBody = {
  email: string;
};

const sendVerificationLink = async (
  req: TypedRequestBody<MailBody>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await getByEmail(email);
    if (!user) {
      return;
    }
    const userSecurity = await getByUserId(user.id);
    if (!userSecurity?.email_activation_token) {
      return;
    }
    const token = generateMailToken({
      email,
      isActivated: false,
    });
    sendMail(email, token);
    await updateMailToken(user.id, token);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { sendVerificationLink };