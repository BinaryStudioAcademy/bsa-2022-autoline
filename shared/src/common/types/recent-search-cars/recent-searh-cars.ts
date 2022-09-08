type RecentSearchCarsResponse = {
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

type RecentSearchRequestDto = {
  userId: string;
  modelId: string;
};

export type { RecentSearchCarsResponse, RecentSearchRequestDto };
