import { API } from '../api-routes';
import { api } from '../index';

interface UserFields {
  sex: string;
  birthYear: string;
  location: string;
  name: string;
  phone: string;
  email: string;
  photoUrl: string;
}

export interface ProfileFieldsRequestData extends UserFields {
  password: string;
  newPassword: string;
  repeatNewPassword: string;
}

export interface ProfileFieldsResponseData extends UserFields {}

export const updateUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateUserProfile: builder.mutation<
      ProfileFieldsResponseData,
      ProfileFieldsRequestData
    >({
      query: (put) => ({
        url: `${API.USER}`,
        method: 'PUT',
        body: put,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUserProfile: builder.mutation<void, void>({
      query: () => ({
        url: `${API.USER}`,
        method: 'DELETE',
      }),
    }),
    getUser: builder.query<ProfileFieldsResponseData, void>({
      query: () => API.USER,
      providesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useUpdateUserProfileMutation,
  useDeleteUserProfileMutation,
  useGetUserQuery,
} = updateUserApi;
