import { ContentType } from '@common/enums/enums';
import { SignInResponseData, SignInRequestData } from '@common/types/types';

import {
  ApiPath,
  AuthApiPath,
} from '../../../../shared/src/common/enums/enums';
import { Api } from './index';

type ResetPasswordRequestData = {
  id: string;
  password: string;
};

export const authApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponseData, SignInRequestData>({
      query: (credentials) => ({
        url: `${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
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
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
