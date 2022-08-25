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

interface viewedCar {
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
  prices_ranges: {
    price_start: number;
    price_end: number;
  }[];
}

interface formatViewedCarData {
  brand: string;
  model: string;
  complectation: string;
  year: string;
  photo_urls: Prisma.JsonValue;
  price: string;
}

interface GetViewedCarsListResponse {
  list: formatViewedCarData[];
  count: number;
}

type GetViewedCarsListRequest = {
  userId: string;
  skip: string;
  take: string;
};

export type {
  UserCreateInput,
  UserResetPassword,
  WishlistInput,
  GetViewedCarsListResponse,
  GetViewedCarsListRequest,
  viewedCar,
  formatViewedCarData,
};
