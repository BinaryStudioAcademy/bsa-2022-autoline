import { ViewedCarsResponse, ViewedCarsParams } from '@common/types/types';

import { api } from '..';
import { API } from '../api_routes';

const historyViewedCarsApi = api.injectEndpoints({
  endpoints: ({ query }) => ({
    getHistoryOfViwedCars: query<ViewedCarsResponse, ViewedCarsParams>({
      query: ({ userId, skip, take }) => ({
        url: `${API.VIEWED_CARS}/${userId}`,
        params: {
          skip,
          take,
        },
      }),
    }),
  }),
});

export const { useGetHistoryOfViwedCarsQuery } = historyViewedCarsApi;
