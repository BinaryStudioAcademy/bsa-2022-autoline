import { ApiPath, AuthApiPath } from '@autoline/shared/common/enums/enums';
import { ContentType } from '@common/enums/enums';
import {
  SignInResponseData,
  SignInRequestUser,
  SignUpResponseData,
  SignUpRequestData,
} from '@common/types/types';

import { api } from './index';

type ResetPasswordRequestData = {
  id: string;
  password: string;
};

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponseData, SignInRequestUser>({
      query: (credentials) => ({
        url: `${ApiPath.AUTH}/local/signin`,
        method: 'POST',
        body: credentials,
      }),
    }),
    signUp: builder.mutation<SignUpResponseData, SignUpRequestData>({
      query: (credentials) => ({
        url: `${ApiPath.AUTH}/local/signup`,
        method: 'POST',
        body: credentials,
      }),
    }),
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

export const {
  useSignInMutation,
  useSignUpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
