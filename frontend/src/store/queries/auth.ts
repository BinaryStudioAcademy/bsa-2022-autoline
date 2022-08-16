import { ApiPath, AuthApiPath } from '@common/enums/enums';
import { SignInResponseData, SignInRequestData } from '@common/types/types';

import { Api } from './index';

export const authApi = Api.injectEndpoints({
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
