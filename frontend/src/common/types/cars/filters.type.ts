import { BrandDetailsType } from '@common/types/cars/brand-details.type';

type FiltersType = {
  regionId: string;
  yearStart: string;
  yearEnd: string;
  priceStart: string;
  priceEnd: string;
  enginePowerStart: string;
  enginePowerEnd: string;
  engineDisplacementStart: string;
  engineDisplacementEnd: string;
};

type CheckListsType = {
  bodyTypeId: string[];
  colorId: string[];
  transmissionTypeId: string[];
  fueltypeId: string[];
  drivetrainId: string[];
};

type CarFiltersType = {
  filters: FiltersType;
  checkLists: CheckListsType;
  brandDetails: BrandDetailsType[];
};

export type { CarFiltersType };
