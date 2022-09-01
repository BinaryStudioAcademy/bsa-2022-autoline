import { API } from '@store/queries/api-routes';

import { api } from '..';

// TODO: Change void type
export const comparisonsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addCarToComparison: builder.mutation<void, void>({
      query: (newComparison) => ({
        url: `${API.COMPARISONS}`,
        method: 'POST',
        body: newComparison,
      }),
    }),
    changeComparisonType: builder.mutation<void, void>({
      query: (changeComparison) => ({
        url: `${API.COMPARISONS}`,
        method: 'PUT',
        body: changeComparison,
      }),
    }),
    clearComparison: builder.mutation<void, void>({
      query: (userId) => ({
        url: `${API.COMPARISONS}`,
        method: 'PUT',
        body: { userId },
      }),
    }),
    deleteCarFromComparison: builder.mutation<void, void>({
      query: (deleteCar) => ({
        url: `${API.COMPARISONS}`,
        method: 'DELETE',
        body: deleteCar,
      }),
    }),
    getActiveComparisonCars: builder.query<void, void>({
      query: (userId) => ({
        url: `${API.COMPARISONS}/${userId}`,
      }),
    }),
  }),
});

export const {
  useAddCarToComparisonMutation,
  useChangeComparisonTypeMutation,
  useClearComparisonMutation,
  useDeleteCarFromComparisonMutation,
  useGetActiveComparisonCarsQuery,
} = comparisonsApi;
