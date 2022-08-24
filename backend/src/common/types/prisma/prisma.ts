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
};

interface GetViewedCarsListResponse {
  name: string;
  year_start: number;
  year_end: number | null;
  photo_urls: Prisma.JsonValue;
  brand: {
    name: string;
  };
  complectations: {
    name: string;
  }[];
}

export type {
  UserCreateInput,
  UserResetPassword,
  WishlistInput,
  GetViewedCarsListResponse,
};
