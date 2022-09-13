import { CarItemType } from '@common/types/wishlist/wishlist.type';

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

interface ExtendedCarCardPropsType {
  type: 'model' | 'complectation';
  car: CarItemType;
}

export type {
  CarDataType,
  CarDataPropsType,
  CarDataListPropsType,
  ExtendedCarCardPropsType,
};
