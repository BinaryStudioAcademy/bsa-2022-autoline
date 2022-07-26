import { User } from '@autoline/shared/common/types/types';

import { api } from '..';
import { API } from '../api-routes';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => API.USERS,
      providesTags: ['User'],
    }),
    getUsersByName: builder.query<User[], string>({
      query: (name) => ({
        url: `${API.USERS}`,
        params: { name },
      }),
      providesTags: ['User'],
    }),
    updateUser: builder.mutation<void, Pick<User, 'id'> & Partial<User>>({
      query: ({ id, ...patch }) => ({
        url: `${API.USERS}/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useGetUsersByNameQuery,
  useUpdateUserMutation,
} = userApi;
