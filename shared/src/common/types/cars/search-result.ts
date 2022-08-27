interface SearchResult {
  id: string;
  body_type_id: string;
  manufacturer_id: string;
  complectations: ComplectationResult[];
  prices_ranges: PricesRangesResult[];
}

interface ComplectationResult {
  id: string;
  color_id: string;
  transmission_type_id: string;
  drivetrain_id: string;
  fuel_type_id: string;
  options: OptionsResult[];
}

interface OptionsResult {
  option_id: string;
}

interface PricesRangesResult {
  id: string;
}

export type { SearchResult };
