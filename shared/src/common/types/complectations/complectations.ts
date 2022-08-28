type OptionType = {
  [index: string]: string[];
};

type ComplectationReturnedDbType = {
  users_wishlists: {
    id: string;
    complectation: {
      id: string;
    };
  }[];
  prices_ranges: {
    price_start: number;
    price_end: number;
  }[];
  engine_displacement: string;
  engine_power: number;
  color: {
    name: string;
  };
  drivetrain: {
    name: string;
  };
  fuel_type: {
    name: string;
  };
  transmission_type: {
    name: string;
  };
  options: {
    important: boolean;
    option: {
      name: string;
      type: string;
    };
  }[];
} | null;

type ModelReturnedDbType = {
  users_wishlists: {
    id: string;
    complectation: {
      id: string;
    };
  }[];
  prices_ranges: {
    price_start: number;
    price_end: number;
  }[];
  complectations: {
    engine_displacement: string;
    engine_power: number;
    color: {
      name: string;
    };
    drivetrain: {
      name: string;
    };
    fuel_type: {
      name: string;
    };
    transmission_type: {
      name: string;
    };
    options: {
      important: boolean;
      option: {
        name: string;
        type: string;
      };
    }[];
  }[];
} | null;

type ComplectationsInput = {
  complectationId: string;
  userId: string;
  modelId: string;
};

type ComplectationReturnedData = {
  data: ComplectationReturnedDbType;
  options: OptionType;
  enginePowers: Array<number | undefined>;
  colors: Array<string | undefined>;
  engineDisplacements: Array<string | undefined>;
  drivetrains: Array<string | undefined>;
  fuelTypes: Array<string | undefined>;
  transmissionTypes: Array<string | undefined>;
  priceStart: number | undefined;
  priceEnd: number | undefined;
};

type ModelReturnedData = {
  data: ModelReturnedDbType;
  options: OptionType;
  enginePowers: number[];
  colors: string[];
  engineDisplacements: string[];
  drivetrains: string[];
  fuelTypes: string[];
  transmissionTypes: string[];
  priceStart: number | undefined;
  priceEnd: number | undefined;
};

export {
  type ModelReturnedData,
  type ComplectationReturnedData,
  type OptionType,
  type ComplectationsInput,
  type ModelReturnedDbType,
  type ComplectationReturnedDbType,
};
