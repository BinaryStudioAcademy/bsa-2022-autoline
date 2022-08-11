import { prisma } from '@data/prisma-client';
import { bcryptHash } from '@helpers/crypto/crypto';
import { createToken } from '@helpers/helpers';
import { User } from '@prisma/client';

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

export { signupLocal, signinLocal };
