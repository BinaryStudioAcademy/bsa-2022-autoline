import { Prisma } from '@prisma/client';

interface UserCreateInput extends Prisma.UserCreateInput {
  password: string;
}

interface UserResetPassword {
  id: string;
  password: string;
}

export type { UserCreateInput, UserResetPassword };
