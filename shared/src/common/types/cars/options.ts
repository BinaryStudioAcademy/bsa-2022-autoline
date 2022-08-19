type AutoRiaOption = {
  autoria_code: number;
  id: string;
  name: string;
};

type OptionsType = {
  regions: AutoRiaOption[];
  bodyTypes: AutoRiaOption[];
  colors: AutoRiaOption[];
  drivetrains: AutoRiaOption[];
  fuelTypes: AutoRiaOption[];
  transmissionTypes: AutoRiaOption[];
};

export type { AutoRiaOption, OptionsType };
