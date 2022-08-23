import { API } from '../api_routes';
import { api } from '../index';

interface UserFields {
  sex: string;
  birthYear: string;
  location: string;
  name: string;
  phone: string;
  email: string;
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
      query: ({ ...put }) => ({
        url: `${API.USER}`,
        method: 'PUT',
        body: put,
      }),
    }),
    deleteUserProfile: builder.mutation<void, void>({
      query: () => ({
        url: `${API.USER}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateUserProfileMutation, useDeleteUserProfileMutation } =
  updateUserApi;
