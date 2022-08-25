import { prisma } from '@data/prisma-client';
import { initializeStrategies } from '@middlewares/auth/strategies/strageties';
import { Prisma, User } from '@prisma/client';
import { signUpSchema } from '@validation-schemas/validation-schemas';
import httpStatus from 'http-status-codes';
import passport from 'passport';

import type {
  SignInRequestData,
  ErrorMessage,
} from '@autoline/shared/common/types/types';
import type {
  TypedRequestBody,
  TypedRequestQuery,
} from '@common/types/controller/controller';
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
    if (existedUser) throw new Error('User with this email already exists!');

    next();
  } catch (err) {
    const { message } = err as ErrorMessage;
    console.error(err);
    res.status(httpStatus.FORBIDDEN).json({ message });
    next(err);
  }
};

const googleAuth = async (
  req: TypedRequestQuery<{ token?: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/',
    state: req.query.token?.toString(),
  })(req, res, next);
};

const googleMiddleware = async (
  req: TypedRequestBody<User>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/',
  })(req, res, next);
};

export { localAuth, signUpMiddleware, googleAuth, googleMiddleware };
