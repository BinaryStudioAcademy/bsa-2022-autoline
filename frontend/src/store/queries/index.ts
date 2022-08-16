import { ENV } from '@common/enums/app/env.enum';
import { RootState } from '@common/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: ENV.API_PATH,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const autolineApi = createApi({
  reducerPath: 'autolineApi',
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
