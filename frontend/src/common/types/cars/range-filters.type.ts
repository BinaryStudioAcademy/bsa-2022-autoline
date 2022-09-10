type RangeFiltersType = {
  year: {
    yearStart: string;
    yearEnd: string;
  };
  price: {
    priceStart: string;
    priceEnd: string;
  };
  enginePower: {
    enginePowerStart: string;
    enginePowerEnd: string;
  };
  engineDisplacement: {
    engineDisplacementStart: string;
    engineDisplacementEnd: string;
  };
};

export type { RangeFiltersType };
