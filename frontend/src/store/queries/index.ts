import { ENV } from '@common/enums/app/env.enum';
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';

type ErrorType = {
  data: string;
  status: number;
};

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: ENV.API_PATH }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    ErrorType
  >,
  endpoints: () => ({}),
});
