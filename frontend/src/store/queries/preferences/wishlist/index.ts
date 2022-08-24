import {
  DeleteWishlistInput,
  WishlistInput,
  WishlistsResponseDto,
} from '@autoline/shared/common/types/types';

import { API } from '../../api_routes';
import { api } from '../../index';

const wishlistApi = api.injectEndpoints({
  endpoints: (build) => ({
    getWishlists: build.query<WishlistsResponseDto, void>({
      query: () => API.WISHLIST,
      providesTags: ['WishlistCars'],
    }),
    createWishlist: build.mutation<WishlistsResponseDto, WishlistInput>({
      query: (params) => ({
        url: `${API.WISHLIST}`,
        method: 'POST',
        params,
      }),
      invalidatesTags: ['WishlistCars'],
    }),
    deleteWishlist: build.mutation<WishlistsResponseDto, DeleteWishlistInput>({
      query: (params) => ({
        url: `${API.WISHLIST}`,
        method: 'DELETE',
        params,
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