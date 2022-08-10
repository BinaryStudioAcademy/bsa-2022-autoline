import { prisma } from '@data/prisma-client';
import Prisma from '@prisma/client';

interface UserResponse {
  userId: string;
  email_token: string | null;
}

interface User_Security {
  user_id: string;
  password: string;
  password_change_token: string | null;
  email_activation_token: string | null;
  email_change_token: string | null;
  email_provisional: string | null;
  refresh_token: string | null;
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
  return userSequrity;
};

const editEmailTokenField = async (id: string): Promise<User_Security> => {
  const user = await prisma.user_Security.update({
    where: {
      id: id,
    },
    data: {
      email_activation_token: null,
    },
  });
  return user;
};

export { addUserSecurity, getUserSecurity, editEmailTokenField };
