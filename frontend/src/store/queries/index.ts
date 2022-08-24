import { ENV } from '@common/enums/app/env.enum';
import { RootState } from '@common/types/types';
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';

export type ErrorType = {
  data: {
    message: string;
  };
  status: number;
};

const baseQuery = fetchBaseQuery({
  baseUrl: ENV.API_PATH,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
}) as BaseQueryFn<string | FetchArgs, unknown, ErrorType>;

export const api = createApi({
  baseQuery: baseQuery,
  tagTypes: ['WishlistCars', 'User'],
  endpoints: () => ({}),
});
