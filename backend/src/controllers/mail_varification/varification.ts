import { ENV } from '@common/enums/app/app';
import * as userSecurityService from '@services/mail_verification/user_security.service';

import { validateMailToken } from '../../services/mail_verification/token.service';

import type { TypedRequestQuery } from '@common/types/controller/controller';
import type { Response, NextFunction } from 'express';

type EmailActivationRequestQuery = {
  link: string;
};

const activateMail = async (
  req: TypedRequestQuery<EmailActivationRequestQuery>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userToken = req.params.link;
    const user = await userSecurityService.getByToken(userToken);
    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL}${ENV.MAIL.FAILED_URL}`);
    }
    const email = validateMailToken(userToken);
    if (!email) {
      return res.redirect(`${process.env.FRONTEND_URL}${ENV.MAIL.FAILED_URL}`);
    }
    const { id } = user;
    await userSecurityService.removeMailToken(id);
    return res.redirect(`${process.env.FRONTEND_URL}${ENV.MAIL.SUCCESS_URL}`);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { activateMail };
