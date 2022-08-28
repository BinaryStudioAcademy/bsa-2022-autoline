import { prisma } from '@data/prisma-client';
import { User } from '@prisma/client';

const getUsers = async (username: string): Promise<User[]> => {
  let data: User[];
  if (username) {
    data = await prisma.user.findMany({
      where: {
        name: {
          contains: username,
        },
      },
    });
  } else {
    data = await prisma.user.findMany();
  }

  return data;
};

const updateUser = async (
  id: string,
  userData: Pick<User, 'id'> & Partial<User>,
): Promise<User> => {
  return await prisma.user.update({
    where: { id },
    data: userData,
  });
};

export { getUsers, updateUser };
