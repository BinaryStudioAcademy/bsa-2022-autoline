import { NewCarPath } from '@common/enums/enums';

import { api } from './index';

import type { CarPreviewType } from '@autoline/shared/common/types/types';

const newCarsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getNewCars: build.query<CarPreviewType[], number>({
      query: (limit: number) => ({
        url: `${NewCarPath.NEW_CARS}`,
        method: 'GET',
        params: {
          limit: limit,
        },
      }),
    }),
  }),
});

export const { useGetNewCarsQuery } = newCarsApi;
