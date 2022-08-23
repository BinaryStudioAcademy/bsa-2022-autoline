import { prisma } from '@data/prisma-client';
import { User } from '@prisma/client';

const getUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  return users;
};

const updateUser = async (
  id: string,
  userData: Pick<User, 'id'> & Partial<User>,
): Promise<User> => {
  const user: User = await prisma.user.update({
    where: { id },
    data: userData,
  });
  return user;
};

export { getUsers, updateUser };
