import { User } from '@autoline/shared/common/types/types';

import { autolineApi } from '..';
import { API } from '../api_routes';

export const userApi = autolineApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => API.USERS,
    }),
    updateUser: builder.mutation<void, Pick<User, 'id'> & Partial<User>>({
      query: ({ id, ...patch }) => ({
        url: `${API.USERS}/${id}`,
        method: 'PATCH',
        body: patch,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetUsersQuery, useUpdateUserMutation } = userApi;
