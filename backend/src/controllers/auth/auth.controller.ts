import * as authService from '@services/auth/auth.service';
import httpStatus from 'http-status-codes';

import type { AuthResponseDto } from '@autoline/shared';
import type { TypedRequestBody } from '@common/types/controller/controller';
import type { UserCreateInput } from '@common/types/types';
import type { NextFunction, Response } from 'express';

const signupLocal = async (
  req: TypedRequestBody<UserCreateInput>,
  res: Response<AuthResponseDto>,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = req.body;
    const authResponseDto = await authService.signupLocal(user);
    res.status(httpStatus.CREATED).json(authResponseDto);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { signupLocal };
