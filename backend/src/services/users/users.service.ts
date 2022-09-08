import { prisma } from '@data/prisma-client';
import { User } from '@prisma/client';

const getUsers = async (username: string): Promise<User[]> => {
  if (username) {
    return prisma.user.findMany({
      where: {
        name: {
          contains: username,
        },
      },
    });
  }
  return prisma.user.findMany();
};

const updateUser = async (
  id: string,
  userData: Pick<User, 'id'> & Partial<User>,
): Promise<User> => {
  const existedUser = await prisma.user.findFirst({
    where: {
      id: {
        not: id,
      },
      email: userData.email,
    },
  });
  if (existedUser) {
    throw new Error('Another user with this email already exists!');
  }

  return await prisma.user.update({
    where: { id },
    data: userData,
  });
};

export { getUsers, updateUser };
