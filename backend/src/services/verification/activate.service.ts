import { prisma } from '@data/prisma-client';
import Prisma from '@prisma/client';

interface UserResponse {
  userId: string;
  email_token: string;
}

interface User_Security {
  user_id: string;
  password: string;
  password_change_token: string;
  email_activation_token: string;
  email_change_token: string;
  email_provisional: string;
  refresh_token: string;
  google_acc_id: string | null;
  facebook_acc_id: string | null;
}

const addUserSecurity = async (user: User_Security): Promise<UserResponse> => {
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

  return {
    userId: newUserId,
    email_token: email_token,
  };
};

const getUserSecurity = async (
  token: string,
): Promise<Prisma.User_Security | null> => {
  const userSequrity = await prisma.user_Security.findFirst({
    where: {
      email_activation_token: token,
    },
  });
  console.log(userSequrity, 'userSequrity');
  return userSequrity;
};

export { addUserSecurity, getUserSecurity };
