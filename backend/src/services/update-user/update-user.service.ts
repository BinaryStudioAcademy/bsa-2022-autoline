import { prisma } from '@data/prisma-client';
import { bcryptHash } from '@helpers/crypto/crypto';
import { Prisma, User } from '@prisma/client';

const updateUser = async (
  user: Prisma.UserCreateInput,
  new_password?: string,
): Promise<User> => {
  const { id, ...userData } = user;
  console.log(userData);

  if (new_password) {
    await updatePassword(new_password, id);
  }

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...userData,
    },
  });

  return updatedUser;
};

const updatePassword = async (
  newPassword: string,
  id?: string,
): Promise<void> => {
  const hashedPassword = await bcryptHash(newPassword);

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      User_Security: {
        update: {
          password: hashedPassword,
        },
      },
    },
  });
};

const deleteUser = async (id: string): Promise<User> => {
  const deletedUser = await prisma.user.delete({
    where: {
      id,
    },
  });

  return deletedUser;
};

export { updateUser, deleteUser };
