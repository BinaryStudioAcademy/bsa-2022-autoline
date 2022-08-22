interface WishlistResponseDto {
  wishlistId: string;
  modelId?: string;
  complectationId?: string;
}

type ModelResponseDto = {
  id: string;
  wishlistId: string | null;
  createdAt: Date;
  name: string;
  yearStart: number;
  yearEnd: number | null;
  photoUrls: string[] | [];
  brand: {
    name: string;
    logoUrl: string;
  };
  bodyType: string;
  manufactureCountry: string;
  pricesRanges: {
    price_start: number;
    price_end: number;
  }[];
  description: string;
  complectationName?: string;
};

type ComplectationResponseDto = {
  id: string;
  wishlistId: string | null;
  createdAt: Date;
  complectationName?: string;
  engine: string;
  engineDisplacement: number;
  enginePower: number;
  color: {
    name: string;
  };
  drivetrain: string;
  fuelType: string;
  transmissionType: string;
  pricesRanges: {
    price_start: number;
    price_end: number;
  }[];
  name: string;
  yearStart: number;
  yearEnd: number | null;
  photoUrls: string[] | [];
  brand: {
    name: string;
    logoUrl: string;
  };
  bodyType: string;
  manufactureCountry: string;
  description: string;
};

interface WishlistsResponseDto {
  models?: ModelResponseDto[];
  complectations?: ComplectationResponseDto[];
  count: number;
}

type WishlistInput = {
  modelId?: string;
  complectationId?: string;
};

type DeleteWishlistInput = {
  wishlistId: string;
};

export {
  type WishlistResponseDto,
  type WishlistsResponseDto,
  type ModelResponseDto,
  type ComplectationResponseDto,
  type WishlistInput,
  type DeleteWishlistInput,
};
