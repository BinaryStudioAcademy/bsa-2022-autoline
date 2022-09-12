type SetViewedCarPayload = {
  complectationId: string;
};

type SetViewedCarRequestDto = {
  userId: string;
  complectationId: string;
};

interface ViewedCarPrismaDto {
  id: string;
  name: string;
  year_start: number;
  year_end: number | null;
  photo_urls: string[] | [];
  brand: {
    name: string;
  };
  complectations: {
    name: string;
    prices_ranges: {
      price_start: number;
      price_end: number;
    }[];
  }[];
}

interface ViewedCarResponseDto {
  id?: string;
  modelId: string;
  brand: string;
  model: string;
  complectation: string;
  year: string;
  photo_urls: string[] | [];
  price: string;
}

interface GetViewedCarsResponse {
  list: ViewedCarResponseDto[];
  count: number;
}

type GetViwedCarsPayload<T> = {
  skip?: T;
  take?: T;
};

type GetViewedCarsRequestDto<T> = {
  userId: string;
  skip?: T;
  take?: T;
};

export type {
  SetViewedCarRequestDto,
  ViewedCarPrismaDto,
  ViewedCarResponseDto,
  GetViewedCarsResponse,
  GetViewedCarsRequestDto,
  GetViwedCarsPayload,
  SetViewedCarPayload,
};
