import { ApiPath, AuthApiPath } from '@common/enums/enums';
import { SignInResponseData, SignInRequestUser } from '@common/types/types';

import { api } from './index';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponseData, SignInRequestUser>({
      query: (credentials) => ({
        url: `${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useSignInMutation } = authApi;
