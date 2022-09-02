import { ComparisonTypeEnum } from '@common/enums/enums';
import { Comparison } from '@common/types/types';
import { API } from '@store/queries/api-routes';

import { api } from '..';

interface ComparisonsRequest {
  complectationId: string;
}

export const comparisonsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addCarToComparison: builder.mutation<Comparison, ComparisonsRequest>({
      query: (newComparison) => ({
        url: `${API.COMPARISONS}`,
        method: 'POST',
        body: newComparison,
      }),
    }),
    changeComparisonType: builder.mutation<
      Comparison,
      { type: ComparisonTypeEnum }
    >({
      query: (changeComparison) => ({
        url: `${API.COMPARISONS}`,
        method: 'PATCH',
        body: changeComparison,
      }),
    }),
    clearComparison: builder.mutation<Comparison, void>({
      query: (userId) => ({
        url: `${API.COMPARISONS}/clear`,
        method: 'PATCH',
        body: { userId },
      }),
    }),
    deleteCarFromComparison: builder.mutation<Comparison, ComparisonsRequest>({
      query: (deleteCar) => ({
        url: `${API.COMPARISONS}`,
        method: 'DELETE',
        body: deleteCar,
      }),
    }),
    // TODO: change void type
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
