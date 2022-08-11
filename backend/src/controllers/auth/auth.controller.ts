import { User } from '@prisma/client';
import * as authService from '@services/auth/auth.service';
import httpStatus from 'http-status-codes';

import type {
  AuthResponseDto,
  SignInRequestData,
  SignInResponseData,
} from '@autoline/shared';
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

const signinLocal = async (
  req: TypedRequestBody<SignInRequestData>,
  res: Response<SignInResponseData>,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = req.user;
    const loginResponseDto = await authService.signinLocal(user as User);
    res.json(loginResponseDto).status(httpStatus.OK);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { signupLocal, signinLocal };
