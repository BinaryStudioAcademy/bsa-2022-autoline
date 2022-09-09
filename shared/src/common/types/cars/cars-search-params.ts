type CarsSearchParams = {
  bodyTypeId: string[];
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
  brandDetails: Array<{
    brandId: string;
    modelIds?: string[];
  }>;
};

export { type CarsSearchParams };
