import { User } from '@autoline/shared/common/types/types';

import { autolineApi } from '..';
import { API } from '../api_routes';

export const userApi = autolineApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => API.USERS,
    }),
  }),
  overrideExisting: false,
});

export const { useGetUsersQuery } = userApi;
