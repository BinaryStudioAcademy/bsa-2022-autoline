import { RecentSearchCarsResponse } from '@autoline/shared/common/types/types';

import { api } from '..';
import { API } from '../api-routes';

const recentSearchApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRecentSearchCars: build.query<RecentSearchCarsResponse[], number>({
      query: (params) => ({
        url: `${API.RECENT_SEARCH}`,
        params: { take: params },
      }),
      providesTags: ['RecentSearchCars'],
    }),
    createRecentSearchCars: build.mutation<void, string>({
      query: (modelId) => ({
        url: `${API.RECENT_SEARCH}`,
        method: 'POST',
        body: { modelId },
      }),
      invalidatesTags: ['RecentSearchCars'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRecentSearchCarsQuery,
  useCreateRecentSearchCarsMutation,
} = recentSearchApi;
