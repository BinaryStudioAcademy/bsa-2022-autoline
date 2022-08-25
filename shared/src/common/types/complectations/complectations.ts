type ModelComplectationsResponseDto = {
  complectations: {
    price_start: string;
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
      option: {
        name: string;
        type: string;
      };
    }[];
  }[];
} | null;

type OptionType = {
  security: string[];
  optics: string[];
  multimedia: string[];
  upholstery: string[];
  sound: string[];
  design: string[];
  comfort: string[];
  auxiliary: string[];
};

type ComplectationsResponseDto = {
  model: ModelComplectationsResponseDto;
  options: OptionType;
  enginePowers: number[];
  colors: string[];
  engineDisplacements: string[];
  drivetrains: string[];
  fuelTypes: string[];
  transmissionTypes: string[];
};

export {
  type ModelComplectationsResponseDto,
  type ComplectationsResponseDto,
  type OptionType,
};
