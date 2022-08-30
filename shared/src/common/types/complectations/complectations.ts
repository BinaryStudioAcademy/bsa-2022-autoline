type OptionType = {
  [index: string]: string[];
};

type ComplectationsInput = {
  complectationId: string;
  userId: string;
  modelId: string;
};

type ComplectationReturnedData = {
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

export {
  type ModelReturnedData,
  type ComplectationReturnedData,
  type OptionType,
  type ComplectationsInput,
};
