type ViewedCarDataList = {
  carDataList: ViewedCarsResponse;
};

type ViewedCarData = {
  carData: formatViewedCarData;
};

interface formatViewedCarData {
  brand: string;
  model: string;
  complectation: string;
  year: string;
  photo_urls: string[];
  price: string;
}

interface ViewedCarsResponse {
  list: formatViewedCarData[];
  count: number;
}

type ViewedCarsParams = {
  userId: string;
  skip: string;
  take: string;
};

export {
  type ViewedCarDataList,
  type ViewedCarData,
  type ViewedCarsResponse,
  type ViewedCarsParams,
};
