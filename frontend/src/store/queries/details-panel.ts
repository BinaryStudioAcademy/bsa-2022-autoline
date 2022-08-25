import { ApiPath } from '@autoline/shared/common/enums/enums';
import { ComplectationsResponseDto } from '@autoline/shared/common/types/types';

import { api } from './index';

export const detailsPanelApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getComplectations: builder.query<ComplectationsResponseDto, string>({
      query: (complectationId) => ({
        url: `${ApiPath.COMPLECTATION}?complectationId=${complectationId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetComplectationsQuery } = detailsPanelApi;
