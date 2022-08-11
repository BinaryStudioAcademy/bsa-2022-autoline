import { prisma } from '@data/prisma-client';
import { bcryptHash } from '@helpers/crypto/crypto';
import { createToken } from '@helpers/helpers';
import { User } from '@prisma/client';
import { mailSend } from '@services/mail_verification/send.service';
import { updateMailToken } from '@services/mail_verification/user_security.service';

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

  const token = mailSend(newUserEmail);
  updateMailToken(newUserId, token);

  return {
    message: 'User created',
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
