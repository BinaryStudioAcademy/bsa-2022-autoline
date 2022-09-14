export type CarItemType = {
  id: string;
  modelId?: string;
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
  createdAt?: string;
};

export type WishlistType = {
  models: CarItemType[] | [];
  complectations: CarItemType[] | [];
};
