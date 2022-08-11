import { prisma } from '@data/prisma-client';
import { bcryptHash } from '@helpers/crypto/crypto';
import { mailSend } from '@services/mail_verification/send.service';
import { updateMailToken } from '@services/mail_verification/user_security.service';

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

  const token = mailSend(newUserEmail);
  updateMailToken(newUserId, token);

  return {
    message: 'User created',
  };
};

export { signupLocal };
