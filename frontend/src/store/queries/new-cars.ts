import { NewCarPath } from '@common/enums/enums';

import { api } from './index';

import type { ModelResponseDto } from '@autoline/shared/common/types/types';

const newcarsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getNewCars: build.query<ModelResponseDto[], void>({
      query: () => ({
        url: `${NewCarPath.NEW_CARS}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetNewCarsQuery } = newcarsApi;
