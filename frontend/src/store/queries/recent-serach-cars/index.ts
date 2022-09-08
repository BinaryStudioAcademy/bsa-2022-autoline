import { RecentSearchCarsResponse } from '@autoline/shared/common/types/types';

import { api } from '..';
import { API } from '../api-routes';

const recentSearchApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRecentSearchCars: build.query<RecentSearchCarsResponse, void>({
      query: () => API.RECENT_SEARCH,
    }),
    createRecentSearchCars: build.mutation<void, string>({
      query: (params) => ({
        url: `${API.RECENT_SEARCH}`,
        method: 'POST',
        body: params,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRecentSearchCarsQuery,
  useCreateRecentSearchCarsMutation,
} = recentSearchApi;
