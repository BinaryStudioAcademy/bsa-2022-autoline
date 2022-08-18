import { ENV } from '@common/enums/app/env.enum';
import { User } from '@prisma/client';
import * as authService from '@services/auth/auth.service';
import httpStatus from 'http-status-codes';

import type {
  SignUpResponseDto,
  SignInRequestData,
  SignInResponseData,
} from '@autoline/shared';
import type {
  TypedRequestBody,
  TypedRequestParams,
  TypedRequestQuery,
} from '@common/types/controller/controller';
import type { UserCreateInput, UserResetPassword } from '@common/types/types';
import type { NextFunction, Response } from 'express';

const signupLocal = async (
  req: TypedRequestBody<UserCreateInput>,
  res: Response<SignUpResponseDto>,
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

const resetPasswordRequest = async (
  req: TypedRequestParams<{ email: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const emailLink = await authService.requestPasswordReset(req.params.email);
    res.json(emailLink);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.statusCode = 400;
      res.json(error.message);
    }
    next(error);
  }
};

const resetPasswordCheckToken = async (
  req: TypedRequestQuery<{ token: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.query.token) return;
    const token = req.query.token.toString();
    const userId = await authService.resetPasswordCheckToken(token);
    res.redirect(`${ENV.APP.FRONTEND_URL}/reset-password?id=${userId}`);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.statusCode = 403;
      res.json(error.message);
    }
    // redirect to the page with 'oops, link is expired' error
    res.redirect('https://www.google.com');
    next(error);
  }
};

const resetPassword = async (
  req: TypedRequestBody<UserResetPassword>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await authService.resetPassword(req.body.id, req.body.password);
    res.json('Password changed successfully');
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.statusCode = 403;
      res.json(error.message);
    }
    next(error);
  }
};

export {
  signupLocal,
  signinLocal,
  resetPasswordRequest,
  resetPasswordCheckToken,
  resetPassword,
};
