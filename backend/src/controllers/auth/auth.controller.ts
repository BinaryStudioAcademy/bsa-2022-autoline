import { Prisma } from '@prisma/client';
import * as authService from '@services/auth/auth.service';
import httpStatus from 'http-status-codes';

import type { AuthResponseDto } from '@autoline/shared';
import type { TypedRequestBody } from '@common/types/controller/controller';
import type { NextFunction, Response } from 'express';

const signupLocal = async (
  req: TypedRequestBody<Prisma.UserCreateInput>,
  res: Response<AuthResponseDto>,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = req.body;
    const authResponseDto = await authService.signupLocal(user);
    res.json(authResponseDto).status(httpStatus.CREATED);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { signupLocal };
