import { ENV } from '@common/enums/app/env.enum';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: ENV.API_PATH }),
  endpoints: (builder) => ({
    SignIn: builder.mutation({
      query: (credentials) => ({
        url: '/auth/local/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useSignInMutation } = authApi;
