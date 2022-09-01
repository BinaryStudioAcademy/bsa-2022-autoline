import { api } from '..';
import { API } from '../api-routes';

import type {
  GetViwedCarsPayload,
  GetViewedCarsResponse,
  SetViewedCarPayload,
} from '@autoline/shared';

const historyViewedCarsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getHistoryOfViwedCars: build.query<
      GetViewedCarsResponse,
      GetViwedCarsPayload<string>
    >({
      query: (params) => ({
        url: `${API.VIEWED_CARS}`,
        params,
      }),
      providesTags: ['ViewedCars'],
    }),
    addViewedCar: build.mutation<void, SetViewedCarPayload>({
      query: (params) => ({
        url: `${API.VIEWED_CARS}`,
        method: 'POST',
        params,
      }),
      invalidatesTags: ['ViewedCars'],
    }),
  }),
});

export const { useGetHistoryOfViwedCarsQuery, useAddViewedCarMutation } =
  historyViewedCarsApi;
