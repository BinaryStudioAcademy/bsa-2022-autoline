import { ComparisonInfo, ComparisonGeneralInform } from '@autoline/shared';
import { ComparisonTypeEnum } from '@common/enums/enums';
import { Comparison } from '@common/types/types';
import { API } from '@store/queries/api-routes';

import { api } from '..';

interface ComparisonsRequest {
  complectationId: string | string[];
  lastPosition?: number;
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
    getActiveComparisonStatus: builder.query<string[], void>({
      query: () => ({
        url: `${API.COMPARISONS}/status`,
      }),
      providesTags: ['Comparisons'],
    }),
    getComparisonGeneralInfo: builder.query<ComparisonGeneralInform[], void>({
      query: () => `${API.COMPARISONS}/general`,
      providesTags: ['Comparisons'],
    }),
    getComparisonOptions: builder.query<string[], { type: string }>({
      query: ({ type }) => ({
        url: `${API.COMPARISONS}/option/${type}`,
      }),
    }),
    getComparisonCars: builder.query<ComparisonInfo[], void>({
      query: () => ({
        url: API.COMPARISONS,
        method: 'GET',
      }),
      providesTags: ['Comparisons'],
    }),
    updatePositions: builder.mutation<void, string[]>({
      query: (positions) => ({
        url: `${API.COMPARISONS}/position`,
        method: 'PATCH',
        body: { positions },
      }),
      invalidatesTags: ['Comparisons'],
    }),
    getCarsCount: builder.query<number, string>({
      query: (complectationId) => ({
        url: `${API.COMPARISONS}/count/${complectationId}`,
      }),
    }),
  }),
});

export const {
  useAddCarToComparisonMutation,
  useChangeComparisonTypeMutation,
  useClearComparisonMutation,
  useDeleteCarFromComparisonMutation,
  useGetActiveComparisonStatusQuery,
  useGetComparisonOptionsQuery,
  useGetComparisonGeneralInfoQuery,
  useGetComparisonCarsQuery,
  useUpdatePositionsMutation,
  useGetCarsCountQuery,
} = comparisonsApi;

export const rejectedAddToComparison =
  comparisonsApi.endpoints.addCarToComparison.matchRejected;
