import { Prisma } from '@prisma/client';

interface UserCreateInput extends Prisma.UserCreateInput {
  password: string;
}

export type { UserCreateInput };
