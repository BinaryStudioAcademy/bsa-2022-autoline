import { prisma } from '@data/prisma-client';
import { bcryptHash } from '@helpers/crypto/crypto';
import { createToken } from '@helpers/helpers';
import { Prisma, User } from '@prisma/client';

import type { AuthResponseDto, SignInResponseData } from '@autoline/shared';

const signupLocal = async (
  user: Prisma.UserCreateInput,
): Promise<AuthResponseDto> => {
  const { password, ...userData } = user;
  const hashedPassword = await bcryptHash(password);

  const { id: newUserId, email: newUserEmail } = await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
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
  const { email } = user;

  const accessTokenPayload = {
    email,
    sub: 'accessToken',
  };

  const refreshTokenPayload = {
    email,
    sub: 'refreshToken',
  };

  const accessToken = createToken(accessTokenPayload);
  const refreshToken = createToken(refreshTokenPayload, false);
  // await prisma.user_security.update({
  //   where: { user_id: id },
  //   data: { refresh_token: refreshToken },
  // });
  return { accessToken, refreshToken };
};

export { signupLocal, signinLocal };
