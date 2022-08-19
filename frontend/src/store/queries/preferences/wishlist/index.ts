import { WishlistsResponseDto } from '@autoline/shared/common/types/types';

import { API } from '../../api_routes';
import { api } from '../../index';

const wishlistApi = api.injectEndpoints({
  endpoints: (build) => ({
    getWishlists: build.query<WishlistsResponseDto, void>({
      query: () => API.WISHLIST,
      providesTags: ['WishlistCars'],
    }),
    createWishlist: build.mutation<
      WishlistsResponseDto,
      {
        modelId?: string;
        complectationId?: string;
      }
    >({
      query: (params) => ({
        url: `${API.WISHLIST}`,
        method: 'POST',
        params,
      }),
      invalidatesTags: ['WishlistCars'],
    }),
    deleteWishlist: build.mutation<WishlistsResponseDto, string>({
      query: (wishlistId: string) => ({
        url: `${API.WISHLIST}?wishlistId=${wishlistId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['WishlistCars'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetWishlistsQuery,
  useCreateWishlistMutation,
  useDeleteWishlistMutation,
} = wishlistApi;
