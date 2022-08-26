type PriceRangeType = {
  complectation_id?: string;
  created_at: string;
  id: string;
  model_id?: string;
  price_end?: number;
  price_start: number;
};

export type ModelType = {
  autoria_code: number;
  body_type_id: string;
  code_name: string;
  id: string;
  manufacture_country_id: string;
  manufacturer_id: string;
  name: string;
  photo_urls: string[];
  prices_ranges: PriceRangeType[];
  year_end?: number;
  year_start: number;
};