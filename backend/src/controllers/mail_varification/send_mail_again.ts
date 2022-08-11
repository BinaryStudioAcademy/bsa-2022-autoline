import { ENV } from '@common/enums/app/app';

import type { TypedRequestQuery } from '@common/types/controller/controller';
import type { Response, NextFunction } from 'express';

type EmailActivationRequestQuery = {
  link: string;
};

const sendMailAgain = async (
  req: TypedRequestQuery<EmailActivationRequestQuery>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authorizationHeader = req.headers.authorization;
    const accesstoken = authorizationHeader?.split(' ')[1];
    console.log(accesstoken, 'authorizationHeader');
    if (!authorizationHeader) {
      return res.redirect(ENV.MAIL.SUCCESS_URL);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { sendMailAgain };
