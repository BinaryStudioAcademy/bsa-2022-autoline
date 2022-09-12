import { API } from '../api-routes';
import { api } from '../index';

interface UserFields {
  sex: string;
  birthYear: string | null;
  location: string | null;
  name: string;
  phone: string | null;
  email: string | null;
  photoUrl: string | null;
  role: string;
  isGoogleConnected: boolean;
  isFacebookConnected: boolean;
}

export interface ProfileFieldsRequestData extends UserFields {
  password: string | null;
  newPassword: string | null;
  repeatNewPassword: string | null;
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
    deleteOauth: builder.mutation<void, { provider: string }>({
      query: (body) => ({
        url: `${API.USER}/oauth`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    updateUserPhoto: builder.mutation<string, FormData>({
      query: (put) => ({
        url: `${API.USER}/photo`,
        method: 'PUT',
        body: put,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUserPhoto: builder.mutation<void, void>({
      query: () => ({
        url: `${API.USER}/photo`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useUpdateUserProfileMutation,
  useDeleteUserProfileMutation,
  useGetUserQuery,
  useDeleteOauthMutation,
  useUpdateUserPhotoMutation,
  useDeleteUserPhotoMutation,
} = updateUserApi;
