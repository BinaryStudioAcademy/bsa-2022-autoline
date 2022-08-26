import { api } from '..';
import { API } from '../api_routes';

import type {
  GetViewedCarsRequestDto,
  GetViewedCarsResponse,
  SetViewedCarRequestDto,
} from '@autoline/shared';

const historyViewedCarsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getHistoryOfViwedCars: build.query<
      GetViewedCarsResponse,
      GetViewedCarsRequestDto<string>
    >({
      query: ({ userId, skip, take }) => ({
        url: `${API.VIEWED_CARS}/${userId}`,
        params: {
          skip,
          take,
        },
      }),
      providesTags: ['ViewedCars'],
    }),
    addViewedCar: build.mutation<void, SetViewedCarRequestDto>({
      query: ({ userId, modelId, complectationId }) => ({
        url: `${API.VIEWED_CARS}/${userId}`,
        method: 'POST',
        params: {
          modelId,
          complectationId,
        },
      }),
      invalidatesTags: ['ViewedCars'],
    }),
  }),
});

export const { useGetHistoryOfViwedCarsQuery, useAddViewedCarMutation } =
  historyViewedCarsApi;
