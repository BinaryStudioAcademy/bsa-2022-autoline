import { ApiPath, AuthApiPath } from '@common/enums/enums';
import {
  SignInResponseData,
  SignInRequestData,
  SignUpResponseData,
  SignUpRequestData,
} from '@common/types/types';

import { api } from './index';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponseData, SignInRequestData>({
      query: (credentials) => ({
        url: `${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
        method: 'POST',
        body: credentials,
      }),
    }),
    signUp: builder.mutation<SignUpResponseData, SignUpRequestData>({
      query: (credentials) => ({
        url: `${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
