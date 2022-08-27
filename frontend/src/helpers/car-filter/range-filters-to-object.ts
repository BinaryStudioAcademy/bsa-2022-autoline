import { RangeFiltersType } from '@common/types/car-filter/range-filters.type';

export const rangeFiltersToObject = (
  rangeFilters: RangeFiltersType,
): { [p: string]: string[] | string } => {
  return Object.fromEntries(
    Object.values(rangeFilters).flatMap((item) => {
      return Object.entries(item);
    }),
  );
};
