import { TopCar } from '@autoline/shared';

import { api } from '..';
import { API } from '../api-routes';

const topAutolineApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTopAutoline: build.query<TopCar[], void>({
      query: () => ({
        url: `${API.TOP_AUTOLINE}/cars`,
      }),
    }),
  }),
});

export const { useGetTopAutolineQuery } = topAutolineApi;
