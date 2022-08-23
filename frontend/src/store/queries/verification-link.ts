import { VerificationLinkPath } from '@common/enums/enums';

import { api } from './index';

const emailApi = api.injectEndpoints({
  endpoints: (build) => ({
    requestLink: build.mutation<void, string>({
      query: (email: string) => ({
        url: `${VerificationLinkPath.VERIFICATION_LINK}`,
        method: 'POST',
        body: { email },
      }),
    }),
  }),
});

export const { useRequestLinkMutation } = emailApi;
