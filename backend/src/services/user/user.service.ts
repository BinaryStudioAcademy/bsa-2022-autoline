import { ExceptionMessage } from '@common/enums/exception/exception-message.enum';
import { UpdateUserReq } from '@controllers/update-user/update-user.controller';
import { prisma } from '@data/prisma-client';
import { bcryptHash } from '@helpers/crypto/crypto';
import { Prisma } from '@prisma/client';
import { validatePassword } from '@services/password-validation/password-validation.service';

interface UpdateUserProps extends Prisma.UserCreateInput {
  newPassword?: string;
  password?: string;
}

const updateUser = async (
  props: UpdateUserProps,
): Promise<Partial<UpdateUserReq>> => {
  const { id, newPassword, password, ...userData } = props;

  if (id) {
    await emailExist(id, userData.email);

    if (newPassword && password) {
      await passwordCheck(id, password);
      await updatePassword(id, newPassword);
    }
  }

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...userData,
    },
  });

  return {
    name: updatedUser.name,
    birthYear: updatedUser.birth_year,
    sex: updatedUser.sex,
    phone: updatedUser.phone,
    email: updatedUser.email,
    location: updatedUser.location,
    photoUrl: updatedUser.photo_url,
  };
};

const updatePassword = async (
  id: string,
  newPassword: string,
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

const deleteUser = async (id: string): Promise<Partial<UpdateUserReq>> => {
  const deletedUser = await prisma.user.delete({
    where: {
      id,
    },
  });

  return {
    name: deletedUser.name,
    birthYear: deletedUser.birth_year,
    sex: deletedUser.sex,
    phone: deletedUser.phone,
    email: deletedUser.email,
    location: deletedUser.location,
    photoUrl: deletedUser.photo_url,
  };
};

const getUser = async (id: string): Promise<Partial<UpdateUserReq> | null> => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      User_Security: {
        select: {
          google_acc_id: true,
          facebook_acc_id: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error(ExceptionMessage.USER_NOT_EXIST);
  }

  return {
    name: user.name,
    birthYear: user.birth_year,
    sex: user.sex,
    phone: user.phone,
    email: user.email,
    location: user.location,
    photoUrl: user.photo_url,
    role: user.role,
    isGoogleConnected: !!user.User_Security?.google_acc_id,
    isFacebookConnected: !!user.User_Security?.facebook_acc_id,
  };
};

const emailExist = async (id: string, email: string): Promise<void> => {
  if (email) {
    const existedUser = await prisma.user.findFirst({
      where: {
        id: {
          not: id,
        },
        email,
      },
    });
    if (existedUser) {
      throw new Error(ExceptionMessage.USER_EXISTS);
    }
  }
};

const passwordCheck = async (id: string, password: string): Promise<void> => {
  const findUser = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      User_Security: true,
    },
  });

  const passwordMatches = await validatePassword(
    password,
    findUser?.User_Security,
  );

  if (!passwordMatches) {
    throw new Error('Incorrect current password');
  }
};

const deleteOauthConnections = async (
  userId: string,
  provider: string,
): Promise<void> => {
  const providerName =
    provider === 'Google' ? 'google_acc_id' : 'facebook_acc_id';

  await prisma.user_Security.updateMany({
    where: {
      user_id: userId,
      password: {
        not: null,
      },
    },
    data: {
      [providerName]: null,
    },
  });
};

const updateUserPhoto = async (
  id: string,
  photoUrl: string | null,
): Promise<void> => {
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      photo_url: photoUrl,
    },
  });
};

export {
  updateUser,
  deleteUser,
  getUser,
  deleteOauthConnections,
  updateUserPhoto,
};
