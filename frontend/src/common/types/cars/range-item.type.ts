import { RangeNames } from '@common/enums/car/car-filters-names.enum';

export type RangeValueType = {
  rangeName: RangeNames;
  values: { [p: string]: string };
};
