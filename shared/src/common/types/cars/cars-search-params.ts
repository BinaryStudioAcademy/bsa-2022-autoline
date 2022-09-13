type CarsSearchParams = {
  bodyTypeId: string[];
  brandId: string[];
  modelId?: string[];
  yearStart: string;
  yearEnd: string;
  priceStart: string;
  priceEnd: string;
  regionId: string;
  cityId: string;
  colorId: string[];
  transmissionTypeId: string[];
  fuelTypeId: string[];
  drivetrainId: string[];
  enginePowerStart: string;
  enginePowerEnd: string;
  engineDisplacementStart: string;
  engineDisplacementEnd: string;
};

export { type CarsSearchParams };
