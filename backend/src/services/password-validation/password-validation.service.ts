import { User_Security } from '@prisma/client';
import { compare as bcryptCompare } from 'bcrypt';

const validatePassword = async (
  password: string,
  userSecurity: User_Security | null | undefined,
): Promise<boolean> => {
  return bcryptCompare(password, userSecurity?.password || '');
};

export { validatePassword };
