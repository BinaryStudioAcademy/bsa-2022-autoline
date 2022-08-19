import {
  ComplectationResponseDto,
  ModelResponseDto,
  WishlistInput,
} from '@autoline/shared/common/types/types';

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
  car: ComplectationResponseDto | ModelResponseDto;
  deleteWishlist: (wishlistId: string) => Promise<void>;
  createWishlist: (args: WishlistInput) => Promise<void>;
  isLiked: boolean;
}

export type {
  CarDataType,
  CarDataPropsType,
  CarDataListPropsType,
  ExtendedCarCardPropsType,
};
