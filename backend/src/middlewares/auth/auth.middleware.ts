import { prisma } from '@data/prisma-client';
import { initializeStrategies } from '@middlewares/auth/strategies/strageties';
import { Prisma } from '@prisma/client';
import { signUpSchema } from '@validation-schemas/validation-schemas';
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
    {
      session: false,
      failureRedirect: '/',
    },
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

const signUpMiddleware = async (
  req: TypedRequestBody<Prisma.UserCreateInput>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await signUpSchema.validate(req.body);
    const existedUser = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (existedUser) throw new Error();

    next();
  } catch (err) {
    console.error(err);
    res.status(403);
    next(new Error('Some error'));
  }
};

export { localAuth, signUpMiddleware };
