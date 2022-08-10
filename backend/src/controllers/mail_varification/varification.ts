import { ENV } from '@common/enums/app/app';
import * as userSecurityService from '@services/mail_verification/user_security.service';

import type { TypedRequestQuery } from '@common/types/controller/controller';
import type { Response, NextFunction } from 'express';

type EmailActivationRequestQuery = {
  link: string;
};

const activate = async (
  req: TypedRequestQuery<EmailActivationRequestQuery>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userToken = req.params.link;
    const user = await userSecurityService.getByToken(userToken);
    if (!user) {
      return res.redirect(ENV.MAIL.FAILED_URL);
    }
    const { id } = user;
    await userSecurityService.removeMailToken(id);
    return res.redirect(ENV.MAIL.SUCCESS_URL);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { activate };
