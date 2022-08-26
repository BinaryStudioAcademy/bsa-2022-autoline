type ComplectationsResponseDto = {
  complectation: ModelComplectationsResponseDto;
  options: OptionType;
  price: string;
};

type OptionType = {
  [index: string]: string[];
};

type ModelComplectationsResponseDto = {
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

export {
  type ModelComplectationsResponseDto,
  type ComplectationsResponseDto,
  type OptionType,
};
