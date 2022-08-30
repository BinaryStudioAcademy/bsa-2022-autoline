export const isFiltersEmpty = (filters: {
  [p: string]: string | string[];
}): boolean =>
  Object.values(filters).every((filter) => filter === '' || !filter.length);
