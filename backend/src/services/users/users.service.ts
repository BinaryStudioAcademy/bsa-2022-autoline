import { prisma } from '@data/prisma-client';
import { User } from '@prisma/client';

const getUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany();
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
