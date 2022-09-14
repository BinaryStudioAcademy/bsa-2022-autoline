type ComplectationDetailsType = {
  id: string;
  name: string;
  model: string;
  brand: string;
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

type ComplectationOfModelResponse = {
  id: string;
  name: string;
};

export type { ComplectationDetailsType, ComplectationOfModelResponse };
