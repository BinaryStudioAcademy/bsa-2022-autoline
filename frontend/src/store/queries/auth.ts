import { ENV } from '@common/enums/app/env.enum';
import { ApiPath, AuthApiPath } from '@common/enums/enums';
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';

type SignInRequestData = {
  user: {
    email: string;
    password: string;
  };
};

type SignInResponseData = {
  accessToken: string;
};

type ErrorType = {
  data: {
    message: string;
  };
  status: number;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: ENV.API_PATH }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    ErrorType
  >,
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponseData, SignInRequestData>({
      query: (credentials) => ({
        url: `${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useSignInMutation } = authApi;
