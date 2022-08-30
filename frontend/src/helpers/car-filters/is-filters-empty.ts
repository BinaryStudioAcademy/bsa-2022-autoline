export const isFiltersEmpty = (filters: {
  [p: string]: string | string[];
}): boolean => {
  return Boolean(
    Object.values(filters).every((filter) => filter === '' || !filter.length),
  );
};
