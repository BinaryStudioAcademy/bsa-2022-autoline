import { BrandDetailsType } from '@common/types/cars/brand-details.type';
import { RangeFiltersType } from '@common/types/cars/range-filters.type';

type CheckListsType = {
  bodyTypeId: string[];
  colorId: string[];
  transmissionTypeId: string[];
  fuelTypeId: string[];
  drivetrainId: string[];
};

type CarFiltersType = {
  rangeFilters: RangeFiltersType;
  checkLists: CheckListsType;
  brandDetails: BrandDetailsType[];
};

export type { CarFiltersType };
