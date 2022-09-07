import { RangeFiltersType } from '@common/types/cars/range-filters.type';

export const rangeFiltersToObject = (
  rangeFilters: RangeFiltersType,
): { [p: string]: string } => {
  return Object.fromEntries(
    Object.values(rangeFilters).flatMap((item) => {
      return Object.entries(item);
    }),
  );
};
