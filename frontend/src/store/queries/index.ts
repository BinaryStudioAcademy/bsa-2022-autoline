import { ENV } from '@common/enums/app/env.enum';
import { RootState } from '@common/types/types';
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '@store/root-reducer';

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

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: '/auth/refreshToken',
        method: 'POST',
        body: { refreshToken: localStorage.getItem('refresh') },
      },
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      api.dispatch(setCredentials(refreshResult.data));
      localStorage.setItem('token', refreshResult.data as string);
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['WishlistCars', 'User', 'Cars'],
  endpoints: () => ({}),
});
