import { ApiPath } from '@autoline/shared/common/enums/enums';
import {
  ModelReturnedData,
  ComplectationReturnedData,
} from '@autoline/shared/common/types/types';
import { DetailsCarPanelPropsType } from '@common/types/types';

import { api } from './index';

export const detailsPanelApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getComplectations: builder.query<
      ModelReturnedData | ComplectationReturnedData,
      DetailsCarPanelPropsType
    >({
      query: ({ complectationId, modelId }) => ({
        url: `${ApiPath.COMPLECTATION}?complectationId=${complectationId}&modelId=${modelId}`,
        method: 'GET',
      }),
      providesTags: ['DetailsPanel'],
    }),
  }),
});

export const { useGetComplectationsQuery } = detailsPanelApi;
