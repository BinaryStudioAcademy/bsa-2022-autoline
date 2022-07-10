import { AuthResponseDto } from '@autoline/shared';
import { TypedRequestBody } from '@common/types/controller/controller';
import { Prisma } from '@prisma/client';
import { NextFunction, Response } from 'express';

const signupLocal = (
  req: TypedRequestBody<Prisma.UserCreateInput>,
  res: Response<AuthResponseDto>,
  next: NextFunction,
): void => {
  try {
    // res.json({});
  } catch (error) {
    next(error);
  }
};

export { signupLocal };
