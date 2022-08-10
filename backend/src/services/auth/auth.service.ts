import { prisma } from '@data/prisma-client';
import { bcryptHash } from '@helpers/crypto/crypto';

import type { AuthResponseDto } from '@autoline/shared';
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

export { signupLocal };
