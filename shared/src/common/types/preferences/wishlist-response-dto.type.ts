import { CarPreviewType } from '../types';

interface WishlistResponseDto {
  wishlistId: string;
  modelId?: string;
  complectationId?: string;
}

interface WishlistsResponseDto {
  models: CarPreviewType[] | [];
  complectations: CarPreviewType[] | [];
}

type WishlistInput = {
  modelId?: string;
  complectationId?: string;
};

type DeleteWishlistInput = {
  wishlistId: string;
};

export {
  type WishlistResponseDto,
  type WishlistsResponseDto,
  type WishlistInput,
  type DeleteWishlistInput,
};
