import { prisma } from '@data/prisma-client';
import Prisma from '@prisma/client';

const getByEmail = async (email: string): Promise<Prisma.User | null> => {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  return user;
};

export { getByEmail };
