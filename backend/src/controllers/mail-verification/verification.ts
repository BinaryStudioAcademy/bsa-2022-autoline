import { MailActivate } from '@services/mail-verification/send-activation-link/constants';
import { validateMailToken } from '@services/mail-verification/token.service';
import {
  getByToken,
  removeMailToken,
} from '@services/mail-verification/user-data.service/user-security';

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
    const user = await getByToken(userToken);
    if (!user) {
      return res.redirect(MailActivate.FAILED_URL);
    }
    const email = validateMailToken(userToken);
    if (!email) {
      return res.redirect(MailActivate.FAILED_URL);
    }
    await removeMailToken(user.id);

    return res.redirect(MailActivate.SUCCESS_URL);
  } catch (error) {
    next(error);
  }
};

export { activateMail };
