import { ENV } from '@common/enums/app/app';
import { prisma } from '@data/prisma-client';
import { createToken } from '@helpers/helpers';
import { User } from '@prisma/client';
import { bcryptHash, sendEmail } from '@helpers/helpers';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import type { AuthResponseDto, SignInResponseData } from '@autoline/shared';
import type { UserCreateInput } from '@common/types/types';

const signupLocal = async (user: UserCreateInput): Promise<AuthResponseDto> => {
  const { password, ...userData } = user;
  const hashedPassword = await bcryptHash(password);

  const { id: newUserId, email: newUserEmail } = await prisma.user.create({
    data: {
      ...userData,
      User_Security: {
        create: {
          password: hashedPassword,
        },
      },
    },
    select: {
      id: true,
      email: true,
    },
  });

  return {
    userId: newUserId,
    userEmail: newUserEmail,
    accessToken: '',
    refreshToken: '',
  };
};

const signinLocal = async (user: User): Promise<SignInResponseData> => {
  const { email, id } = user;

  const accessTokenPayload = {
    email,
    sub: id,
  };

  const refreshTokenPayload = {
    email,
    sub: id,
  };

  const accessToken = createToken(accessTokenPayload);
  const refreshToken = createToken(refreshTokenPayload, false);

  await prisma.user.update({
    where: { id },
    data: {
      User_Security: {
        update: {
          refresh_token: refreshToken,
        },
      },
    },
  });
  return { accessToken, refreshToken };
};

const requestPasswordReset = async (email: string): Promise<string> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) throw new Error('User with such email does not exist');

  const resetToken = jwt.sign(
    {
      id: user.id,
    },
    ENV.JWT.SECRET!,
    { expiresIn: '1h' },
  );

  await prisma.user_Security.update({
    where: { user_id: user.id },
    data: { password_change_token: resetToken },
  });

  const link = `localhost:${ENV.APP.SERVER_PORT}${ENV.API.V1_PREFIX}/auth/local/reset-password?token=${resetToken}`;

  sendEmail(
    user.email,
    'Password Reset Request',
    {
      name: user.name,
      link: link,
    },
    './template/requestResetPassword.handlebars',
  );
  return link;
};

const resetPasswordCheckToken = async (token: string): Promise<string> => {
  const payload = jwt.verify(token, ENV.JWT.SECRET!) as jwt.JwtPayload;
  const userSecurity = await prisma.user_Security.findUnique({
    where: { user_id: payload.id },
  });

  if (!userSecurity) {
    throw new Error('User does not exist');
  }
  if (!userSecurity.password_change_token) {
    throw new Error('Password reset token does not exist');
  }
  if (token !== userSecurity.password_change_token) {
    await prisma.user_Security.update({
      where: { user_id: payload.id },
      data: { password_change_token: null },
    });
    throw new Error('Invalid password reset token');
  }

  await prisma.user_Security.update({
    where: { user_id: payload.id },
    data: { password_change_token: null },
  });

  return payload.id;
};

const resetPassword = async (id: string, password: string): Promise<void> => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new Error('User does not exist');
  }
  const userSecurity = await prisma.user_Security.findUnique({
    where: { user_id: id },
  });
  if (!userSecurity) {
    throw new Error('User does not exist');
  }
  const isSamePassword = await bcrypt.compare(password, userSecurity.password);
  if (isSamePassword) {
    throw new Error('Same passwords error');
  }

  const hash = await bcryptHash(password);
  await prisma.user_Security.update({
    where: { user_id: id },
    data: { password: hash },
  });

  sendEmail(
    user.email,
    'Password Reset Successfully',
    {
      name: user.name,
    },
    './template/resetPassword.handlebars',
  );
};

export {
  signupLocal,
  signinLocal,
  requestPasswordReset,
  resetPasswordCheckToken,
  resetPassword,
};
