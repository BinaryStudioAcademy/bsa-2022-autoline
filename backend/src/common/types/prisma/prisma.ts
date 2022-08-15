import { Prisma } from '@prisma/client';

interface UserCreateInput extends Prisma.UserCreateInput {
  password: string;
}

interface WishlistInput {
  [key: string]: string | undefined;
  userId: string;
  modelId?: string;
  complectationId?: string;
}

export type { UserCreateInput, WishlistInput };
