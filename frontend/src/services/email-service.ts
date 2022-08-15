import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IEmail {
  email: string;
}

export const emailApi = createApi({
  reducerPath: 'emailApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/v1' }),
  endpoints: (build) => ({
    requestLink: build.mutation<void, IEmail>({
      query: (email) => ({
        url: '/user/verification',
        method: 'POST',
        body: email,
      }),
    }),
  }),
});
