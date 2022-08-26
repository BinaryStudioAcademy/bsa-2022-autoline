interface SearchResult {
  id: string;
  complectations: ComplectationResult[];
}

interface ComplectationResult {
  id: string;
}

export type { SearchResult };
