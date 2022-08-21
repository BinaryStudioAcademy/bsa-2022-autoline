import { sendLink } from '@services/mail-verification/send-activation-link/send-link';
import { generateMailToken } from '@services/mail-verification/token.service';
import { getByEmail } from '@services/mail-varification/user-data.service/user';
import {
  updateMailToken,
  getByUserId,
} from '@services/mail-verification/user-data.service/user-security';
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
