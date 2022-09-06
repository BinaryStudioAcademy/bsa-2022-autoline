import { ComparisonGeneralInform } from '@autoline/shared/common/types/types';
import { API } from '@store/queries/api-routes';
import { api } from '@store/queries/index';

const ComparisonApi = api.injectEndpoints({
  endpoints: (build) => ({
    getComparisonGeneralInfo: build.query<ComparisonGeneralInform[], void>({
      query: () => `${API.COMPARISONS}/general`,
      providesTags: ['Comparisons'],
    }),
  }),
});

export const { useGetComparisonGeneralInfoQuery } = ComparisonApi;
