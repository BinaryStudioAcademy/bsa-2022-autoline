import {
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
    getWishlistEntries: build.query<string[], void>({
      query: () => `${API.WISHLIST}/entries`,
      providesTags: ['WishlistCars'],
    }),
    createWishlist: build.mutation<WishlistResponseDto, WishlistInput>({
      query: (params) => ({
        url: `${API.WISHLIST}`,
        method: 'POST',
        params,
      }),
      invalidatesTags: ['WishlistCars', 'DetailsPanel'],
    }),
    deleteWishlist: build.mutation<WishlistsResponseDto, WishlistInput>({
      query: (params) => ({
        url: `${API.WISHLIST}`,
        method: 'DELETE',
        params,
      }),
      invalidatesTags: ['WishlistCars', 'DetailsPanel'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetWishlistsQuery,
  useGetWishlistEntriesQuery,
  useCreateWishlistMutation,
  useDeleteWishlistMutation,
} = wishlistApi;

export const like = wishlistApi.endpoints.createWishlist.matchRejected;
