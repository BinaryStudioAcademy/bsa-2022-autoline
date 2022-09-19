import { reviewedCarsPath } from '@common/enums/enums';
import { reviewedCarsQuery } from '@common/types/types';

import { api } from './index';

const topAutolineApi = api.injectEndpoints({
  endpoints: (build) => ({
    reviewedCar: build.mutation<void, reviewedCarsQuery>({
      query: ({ modelId, autoriaCode }) => ({
        url: `${reviewedCarsPath.REVIEWED_CARS}`,
        method: 'POST',
        body: { modelId, autoriaCode },
      }),
    }),
  }),
});

export const { useReviewedCarMutation } = topAutolineApi;
