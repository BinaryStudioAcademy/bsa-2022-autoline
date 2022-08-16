import { ApiPath, VerificationLinkPath } from '@common/enums/enums';
import { Email } from '@common/types/types';

import { Api } from './index';

const emailApi = Api.injectEndpoints({
  endpoints: (build) => ({
    requestLink: build.mutation<void, Email>({
      query: (email) => ({
        url: `${ApiPath.AUTH}${VerificationLinkPath.VERIFICATION_LINK}`,
        method: 'POST',
        body: email,
      }),
    }),
  }),
});

export { emailApi };
