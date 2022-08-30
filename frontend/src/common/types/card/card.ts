import { CarPreviewType } from '@autoline/shared/common/types/types';

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
  car: CarPreviewType;
}

export type {
  CarDataType,
  CarDataPropsType,
  CarDataListPropsType,
  ExtendedCarCardPropsType,
};
