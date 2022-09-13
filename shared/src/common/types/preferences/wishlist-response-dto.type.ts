import { CarPreview } from '../types';

interface WishlistResponseDto {
  wishlistId: string;
  modelId?: string;
  complectationId?: string;
}

interface WishlistsResponseDto {
  models: CarPreview[] | [];
  complectations: CarPreview[] | [];
}

type WishlistInput = {
  modelId?: string;
  complectationId?: string;
  createdAt?: string;
};

export {
  type WishlistResponseDto,
  type WishlistsResponseDto,
  type WishlistInput,
};
