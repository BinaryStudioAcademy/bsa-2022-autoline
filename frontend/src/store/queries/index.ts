import { ENV } from '@common/enums/app/env.enum';
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';

export type ErrorType = {
  data: {
    error: string;
  };
  status: number;
};

export const Api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: ENV.API_PATH }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    ErrorType
  >,
  endpoints: () => ({}),
});
