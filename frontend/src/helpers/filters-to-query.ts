import { FiltersType } from '@common/types/cars/filters.type';

export const filtersToQuery = (filters: FiltersType): string[][] => {
  const notEmpties = Object.fromEntries(
    Object.entries(filters).filter(
      ([_, value]) => value.length >= 1 && value !== '' && value[0] !== '',
    ),
  );

  return Object.entries(notEmpties).flatMap(([key, value]) => {
    if (typeof value === 'string') {
      return [[key, value]];
    }
    return value.map((item) => [key, item]);
  });
};
