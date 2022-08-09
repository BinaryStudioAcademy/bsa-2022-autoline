import { prisma } from '@data/prisma-client';
import { bcryptHash } from '@helpers/crypto/crypto';
import { createToken } from '@helpers/helpers';
import { Prisma } from '@prisma/client';

import type { AuthResponseDto, SignInData } from '@autoline/shared';

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

const signinLocal = (user: SignInData): { accessToken: string } => {
  const { email } = user;
  const data = {
    email,
    sub: 'login',
  };

  const accessToken = createToken(data);
  return { accessToken };
};

export { signupLocal, signinLocal };
