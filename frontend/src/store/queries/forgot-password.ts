import { ENV } from '@common/enums/app/env.enum';
import { ApiPath, AuthApiPath, ContentType } from '@common/enums/enums';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type ResetPasswordRequestData = {
  id: string;
  password: string;
};

export const forgotPasswordApi = createApi({
  reducerPath: 'forgotPasswordApi',
  baseQuery: fetchBaseQuery({ baseUrl: ENV.API_PATH }),
  endpoints: (builder) => ({
    forgotPassword: builder.mutation<void, string>({
      query: (email) => ({
        url: `${ApiPath.AUTH}/local${AuthApiPath.RESET_PASSWORD_REQUEST}/${email}`,
        method: 'POST',
      }),
    }),
    resetPassword: builder.mutation<void, ResetPasswordRequestData>({
      query: (payload) => ({
        url: `${ApiPath.AUTH}/local${AuthApiPath.RESET_PASSWORD}`,
        method: 'POST',
        contentType: ContentType.JSON,
        body: payload,
      }),
    }),
  }),
});

export const { useForgotPasswordMutation, useResetPasswordMutation } =
  forgotPasswordApi;
