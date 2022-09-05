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
      invalidatesTags: ['Comparisons'],
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
      query: () => ({
        url: `${API.COMPARISONS}/clear`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Comparisons'],
    }),
    deleteCarFromComparison: builder.mutation<Comparison, ComparisonsRequest>({
      query: (deleteCar) => ({
        url: `${API.COMPARISONS}/${deleteCar.complectationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comparisons'],
    }),
    // TODO: change void type
    getActiveComparisonCars: builder.query<void, void>({
      query: () => ({
        url: `${API.COMPARISONS}`,
      }),
      providesTags: ['Comparisons'],
    }),
    getActiveComparisonStatus: builder.query<string[], void>({
      query: () => ({
        url: `${API.COMPARISONS}/status`,
      }),
      providesTags: ['Comparisons'],
    }),
  }),
});

export const {
  useAddCarToComparisonMutation,
  useChangeComparisonTypeMutation,
  useClearComparisonMutation,
  useDeleteCarFromComparisonMutation,
  useGetActiveComparisonCarsQuery,
  useGetActiveComparisonStatusQuery,
} = comparisonsApi;
