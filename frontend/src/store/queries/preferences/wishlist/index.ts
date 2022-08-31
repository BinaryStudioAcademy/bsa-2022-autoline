import {
  DeleteWishlistInput,
  WishlistInput,
  WishlistResponseDto,
  WishlistsResponseDto,
} from '@autoline/shared/common/types/types';

import { API } from '../../api-routes';
import { api } from '../../index';

const wishlistApi = api.injectEndpoints({
  endpoints: (build) => ({
    getWishlists: build.query<WishlistsResponseDto, void>({
      query: () => API.WISHLIST,
      providesTags: ['WishlistCars'],
    }),
    createWishlist: build.mutation<WishlistResponseDto, WishlistInput>({
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
