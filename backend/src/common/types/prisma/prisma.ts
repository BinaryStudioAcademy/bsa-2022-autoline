import { Prisma } from '@prisma/client';

interface UserCreateInput extends Prisma.UserCreateInput {
  password: string;
}

interface WishlistInput {
  user_id: string;
  model_id?: string;
  complectation_id?: string;
}

export type { UserCreateInput, WishlistInput };
