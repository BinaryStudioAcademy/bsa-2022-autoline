import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IEmail {
  email: string;
}

const emailApi = createApi({
  reducerPath: 'emailApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_ORIGIN_URL }),
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

export { emailApi };
