import { api } from '..';
import { API } from '../api-routes';

import type { GetAllComparisonsResponse } from '@autoline/shared';

const historyOfComparisonsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllComparisons: build.query<GetAllComparisonsResponse, void>({
      query: () => ({
        url: `${API.HISTORY_COMPARISONS}`,
      }),
    }),
    changeActiveComparison: build.mutation<void, { comarisonId: string }>({
      query: ({ comarisonId }) => ({
        url: `${API.HISTORY_COMPARISONS}/${comarisonId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Comparisons'],
    }),
  }),
});

export const { useGetAllComparisonsQuery, useChangeActiveComparisonMutation } =
  historyOfComparisonsApi;
