import { sendLink } from '@services/mail_verification/send_activation_link/sendLink';
import { generateMailToken } from '@services/mail_verification/token.service';
import { getByEmail } from '@services/mail_verification/user_data.service/user';
import {
  updateMailToken,
  getByUserId,
} from '@services/mail_verification/user_data.service/user_security';
import httpStatus from 'http-status-codes';

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
      res.status(httpStatus.ACCEPTED).send();
      return;
    }
    const userSecurity = await getByUserId(user.id);
    if (!userSecurity?.email_activation_token) {
      res.status(httpStatus.ACCEPTED).send();
      return;
    }
    const token = generateMailToken({
      email,
      isActivated: false,
    });
    sendLink(email, token);
    await updateMailToken(user.id, token);
    res.status(httpStatus.ACCEPTED).send();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { sendVerificationLink };
