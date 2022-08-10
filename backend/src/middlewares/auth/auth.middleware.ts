import { prisma } from '@data/prisma-client';
import { initializeStrategies } from '@middlewares/auth/strategies/strageties';
import { Prisma } from '@prisma/client';
import { signUpSchema } from '@validation-schemas/validation-schemas';
import passport from 'passport';

import type { TypedRequestBody } from '@common/types/controller/controller';
import type { NextFunction, Response } from 'express';

initializeStrategies();

const localAuth = passport.authenticate('local');

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
