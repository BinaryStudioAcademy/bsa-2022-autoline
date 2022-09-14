type GetAllComparisonsRequestDto = {
  userId: string;
};

type ChangeActiveComparisonRequestDto = {
  userId: string;
  comparisonId: string;
};

interface AllComparisonsPrismaDto {
  position: number;
  complectation: {
    id: string;
    name: string;
    model: {
      name: string;
      photo_urls: unknown;
      year_start: number;
      year_end: number | null;
      brand: {
        name: string;
      };
    };
    prices_ranges: {
      price_start: number;
      price_end: number;
    }[];
  };
}

interface ComparisonDetail {
  complectationId: string;
  position: number;
  brandName: string;
  complectationName: string;
  priceStart: number;
  priceEnd: number;
  modelName: string;
  photos: string[] | [];
  year: string;
}

interface AllComparisonsDetail {
  id: string;
  list: ComparisonDetail[];
}

interface GetAllComparisonsResponse {
  comparisons: AllComparisonsDetail[];
  count: number;
}

export type {
  GetAllComparisonsRequestDto,
  AllComparisonsPrismaDto,
  ComparisonDetail,
  GetAllComparisonsResponse,
  ChangeActiveComparisonRequestDto,
};
