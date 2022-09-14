type OptionType = {
  [index: string]: string[];
};

type ComplectationsInput = {
  complectationId: string;
  userId: string;
  modelId: string;
};

type ComplectationReturnedData = {
  model: string;
  brand: string;
  name: string;
  options: OptionType;
  enginePowers: Array<number | undefined>;
  colors: Array<string | undefined>;
  engineDisplacements: Array<number>;
  drivetrains: Array<string | undefined>;
  fuelTypes: Array<string | undefined>;
  transmissionTypes: Array<string | undefined>;
  maxPrice: number;
  minPrice: number;
  wishlist: {
    id: string;
  }[];
};

type ModelReturnedData = {
  options: OptionType;
  enginePowers: number[];
  colors: string[];
  engineDisplacements: number[];
  drivetrains: string[];
  fuelTypes: string[];
  transmissionTypes: string[];
  maxPrice: number;
  minPrice: number;
  wishlist: {
    id: string;
  }[];
};

interface ComplectationShortInfoDto {
  id: string;
  name: string;
  model: {
    name: string;
    photo_urls: string[] | [];
    prices_ranges: {
      price_start: number;
      price_end: number;
    }[];
    brand: {
      name: string;
    };
  };
}

interface ComlectationShortInfoResponse {
  id: string;
  complectationName: string;
  brandName: string;
  modelName: string;
  photos: string[] | [];
  priceStart: number;
  priceEnd: number;
}

export {
  type ModelReturnedData,
  type ComplectationReturnedData,
  type OptionType,
  type ComplectationsInput,
  type ComplectationShortInfoDto,
  type ComlectationShortInfoResponse,
};
