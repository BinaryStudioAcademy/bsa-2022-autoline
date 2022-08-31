import { ApiPath, ENV, StorageKey } from '@common/enums/enums';
import { RootState } from '@common/types/types';
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '@store/root-reducer';
import { Mutex } from 'async-mutex';

export type ErrorType = {
  data: {
    message: string;
  };
  status: number;
};

const mutex = new Mutex();
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
  ErrorType
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url: `${ApiPath.AUTH}/refreshToken`,
            method: 'POST',
            body: { refreshToken: (api.getState() as RootState).auth.refresh },
          },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          api.dispatch(setCredentials({ accessToken: refreshResult.data }));
          localStorage.setItem(StorageKey.TOKEN, refreshResult.data as string);

          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logOut());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['WishlistCars', 'User', 'Cars', 'ViewedCars', 'DetailsPanel'],
  endpoints: () => ({}),
});
