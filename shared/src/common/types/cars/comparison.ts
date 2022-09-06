type ComparisonGeneralInform = {
  id: string;
  bodyType: string;
  engine: string;
  engineDisplacement: number;
  enginePower: number;
  colorName: string;
  transmissionTypeName: string;
  drivetrainName: string;
  fuelTypeName: string;
  options: { [x: string]: string[] };
};

export type { ComparisonGeneralInform };
