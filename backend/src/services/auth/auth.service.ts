import { ENV } from '@common/enums/app/app';
import { prisma } from '@data/prisma-client';
import {
  bcryptHash,
  createToken,
  sendEmail,
  verifyToken,
} from '@helpers/helpers';
import { getMessage as getResetConfirmMessage } from '@helpers/mailtrap/templates/reset-password-confirm';
import { getMessage as getResetRequestMessage } from '@helpers/mailtrap/templates/reset-password-request';
import { User } from '@prisma/client';
import { sendLink } from '@services/mail-verification/send-activation-link/send-link';
import { generateMailToken } from '@services/mail-verification/token.service';
import { updateMailToken } from '@services/mail-verification/user-data.service/user-security';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import type { SignInResponseData, SignUpResponseDto } from '@autoline/shared';
import type { UserCreateInput } from '@common/types/types';

const signupLocal = async (
  user: UserCreateInput,
): Promise<SignUpResponseDto> => {
  const { password, ...userData } = user;
  const hashedPassword = await bcryptHash(password);

  const { id, email } = await prisma.user.create({
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

  const token = generateMailToken({
    email,
    isActivated: false,
  });
  sendLink(email, token);
  await updateMailToken(id, token);

  return {
    message: 'User created',
  };
};

const signinLocal = async (user: User): Promise<SignInResponseData> => {
  const { email, id, role } = user;

  const accessTokenPayload = {
    email,
    sub: id,
    role,
  };

  const refreshTokenPayload = {
    email,
    sub: id,
    role,
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
      sub: user.id,
    },
    ENV.JWT.SECRET as string,
    { expiresIn: '1h' },
  );

  await prisma.user_Security.update({
    where: { user_id: user.id },
    data: { password_change_token: resetToken },
  });

  const link = `${ENV.APP.SERVER_DOMAIN}${ENV.API.V1_PREFIX}/auth/local/reset-password-check-token?token=${resetToken}`;

  const template = getResetRequestMessage({
    name: user.name,
    link: link,
  });
  sendEmail(user.email, 'Password Reset Request', template);
  return link;
};

const resetPasswordCheckToken = async (token: string): Promise<string> => {
  const payload = jwt.verify(token, ENV.JWT.SECRET as string) as jwt.JwtPayload;
  if (!payload.sub) {
    throw new Error('Payload token is invalid');
  }

  const userSecurity = await prisma.user_Security.findUnique({
    where: { user_id: payload.sub },
  });

  if (!userSecurity) {
    throw new Error('User does not exist');
  }
  if (!userSecurity.password_change_token) {
    throw new Error('Password reset token does not exist');
  }

  await prisma.user_Security.update({
    where: { user_id: payload.sub },
    data: { password_change_token: null },
  });

  if (token !== userSecurity.password_change_token) {
    throw new Error('Invalid password reset token');
  }
  return payload.sub;
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

  const isSamePassword = await bcrypt.compare(
    password,
    userSecurity.password as string,
  );
  if (isSamePassword) {
    throw new Error('Same passwords error');
  }

  const hash = await bcryptHash(password);
  await prisma.user_Security.update({
    where: { user_id: id },
    data: { password: hash },
  });

  const template = getResetConfirmMessage({ name: user.name });
  sendEmail(user.email, 'Password Reset Successfully', template);
};

const refreshToken = async (token: string): Promise<string> => {
  const tokenPayload = verifyToken(token);

  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: tokenPayload.sub as string,
      User_Security: {
        refresh_token: token,
      },
    },
  });

  return createToken({
    email: user.email,
    sub: user.id,
    role: user.role,
  });
};

export {
  signupLocal,
  signinLocal,
  requestPasswordReset,
  resetPasswordCheckToken,
  resetPassword,
  refreshToken,
};
