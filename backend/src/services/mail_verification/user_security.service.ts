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

const getByUserId = async (
  userId: string,
): Promise<Prisma.User_Security | null> => {
  const userSequrity = await prisma.user_Security.findFirst({
    where: {
      user_id: userId,
    },
  });
  return userSequrity;
};

const getUserByEmail = async (email: string): Promise<Prisma.User | null> => {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  return user;
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

const changeMailToken = async (
  id: string,
  emailToken: string,
): Promise<Prisma.User_Security> => {
  const user_security = await prisma.user_Security.update({
    where: {
      user_id: id,
    },
    data: {
      email_activation_token: emailToken,
    },
  });
  return user_security;
};

export {
  getByToken,
  removeMailToken,
  changeMailToken,
  getUserByEmail,
  getByUserId,
};
