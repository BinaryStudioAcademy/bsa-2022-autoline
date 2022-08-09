import { prisma } from '@data/prisma-client';
import Prisma from '@prisma/client';

interface UserResponse {
  userId: string;
  email_token: string;
}

const activateUserMail = async (
  user: Prisma.User_Security,
): Promise<UserResponse> => {
  const { ...userData } = user;
  const { id: newUserId, email_activation_token: email_token } =
    await prisma.user_Security.create({
      data: {
        ...userData,
      },
      select: {
        id: true,
        email_activation_token: true,
      },
    });
  console.log('ddf', user);
  return {
    userId: newUserId,
    email_token: email_token,
  };
};

export { activateUserMail };
