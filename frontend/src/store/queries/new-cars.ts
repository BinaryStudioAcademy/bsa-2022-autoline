import { NewCarsBrand } from '@autoline/shared/common/types/types';
import { NewCarPath } from '@common/enums/enums';

import { api } from './index';

const newcarsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getNewCars: build.query<NewCarsBrand[], void>({
      query: () => ({
        url: `${NewCarPath.NEW_CARS}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetNewCarsQuery } = newcarsApi;
