import { RangeNames } from '@common//enums/cars/filter-names.enum';

export type RangeValueType = {
  rangeName: RangeNames;
  values: { [p: string]: string };
};
