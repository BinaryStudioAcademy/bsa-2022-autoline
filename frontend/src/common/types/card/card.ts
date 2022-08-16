interface CarDataType {
  photo_url: string;
  title: string;
  price: string;
}

interface CarDataPropsType {
  carData: CarDataType;
}

interface CarDataListPropsType {
  carDataList: CarDataType[];
}

export type { CarDataType, CarDataPropsType, CarDataListPropsType };
