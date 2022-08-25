import { ComplectationsResponseDto } from '@autoline/shared/common/types/types';

import { api } from './index';

export const detailsPanelApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getComplectations: builder.query<ComplectationsResponseDto, string>({
      query: (modelId) => ({
        url: `/complectations?modelId=${modelId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetComplectationsQuery } = detailsPanelApi;
