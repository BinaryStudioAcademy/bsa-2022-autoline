import { initializeStrategies } from '@middlewares/auth/strategies/strageties';
import httpStatus from 'http-status-codes';
import passport from 'passport';

import type { SignInRequestData, ErrorMessage } from '@autoline/shared';
import type { TypedRequestBody } from '@common/types/controller/controller';
import type { NextFunction, Response } from 'express';

initializeStrategies();

const localAuth = (
  req: TypedRequestBody<SignInRequestData>,
  res: Response<ErrorMessage>,
  next: NextFunction,
): void => {
  passport.authenticate(
    'local',
    { session: false },
    (err, user, info: ErrorMessage) => {
      if (err) {
        next(err);
      }
      if (!user) {
        return res.status(httpStatus.FORBIDDEN).json(info);
      }
      req.user = user;
      next();
    },
  )(req, res, next);
};

export { localAuth };
