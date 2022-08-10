import { prisma } from '@data/prisma-client';
import Prisma from '@prisma/client';

const getByToken = async (
  token: string,
): Promise<Prisma.User_Security | null> => {
  const userSequrity = await prisma.user_Security.findFirst({
    where: {
      email_activation_token: token,
    },
  });
  return userSequrity;
};

const removeMailToken = async (id: string): Promise<Prisma.User_Security> => {
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

export { getByToken, removeMailToken };
