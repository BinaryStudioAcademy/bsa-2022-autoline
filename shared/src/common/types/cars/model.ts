type PriceRangeType = {
  complectation_id?: string;
  created_at: string;
  id: string;
  model_id?: string;
  price_end?: number;
  price_start: number;
};

type ModelType = {
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

type ModelDetailsType = {
  id: string;
  modelName: string;
  description: string;
  photoUrls: string[];
  brandName: string;
  priceStart: number;
  priceEnd: number;
  complectationsId: string[];
};

type CarPreview = {
  id: string;
  modelName: string;
  pricesRanges: {
    price_start: number;
    price_end: number;
  }[];
  brand: {
    name: string;
    logoUrl: string;
  };
  complectationName?: string;
  photoUrls: string[] | [];
  description: string;
};

export type { ModelType, ModelDetailsType, CarPreview };
