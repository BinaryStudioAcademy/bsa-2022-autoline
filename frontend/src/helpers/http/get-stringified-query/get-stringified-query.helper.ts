import { stringify } from 'query-string';

const getStringifiedQuery = (query: Record<string, unknown>): string =>
  stringify(query);

export { getStringifiedQuery };
