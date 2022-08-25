type AutocompleteValueType = { label: string; id: string } | null;

type AutocompleteDataType = {
  name: string;
  value: AutocompleteValueType;
};

export type { AutocompleteValueType, AutocompleteDataType };
