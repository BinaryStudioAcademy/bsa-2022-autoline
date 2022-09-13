import { Prisma } from '@prisma/client';

interface UserCreateInput extends Prisma.UserCreateInput {
  password: string;
}

interface UserResetPassword {
  id: string;
  password: string;
}

type WishlistInput = {
  userId: string;
  modelId?: string;
  complectationId?: string;
  createdAt?: string;
};

export type { UserCreateInput, UserResetPassword, WishlistInput };
