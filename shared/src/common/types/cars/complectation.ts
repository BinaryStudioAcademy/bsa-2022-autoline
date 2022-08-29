type ComplectationDetailsType = {
  id: string;
  name: string;
  engine: string;
  engineDisplacement: number;
  enginePower: number;
  colorName: string;
  transmissionTypeName: string;
  drivetrainName: string;
  fuelTypeName: string;
  priceStart: number;
  priceEnd: number;
  optionsCount: number;
  options: { name: string }[];
};

export type { ComplectationDetailsType };
