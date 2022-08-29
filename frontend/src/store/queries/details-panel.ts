import { ApiPath } from '@autoline/shared/common/enums/enums';
import {
  ModelReturnedData,
  ComplectationReturnedData,
} from '@autoline/shared/common/types/types';
import { ENV } from '@common/enums/app/env.enum';
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
    getRate: builder.query<string, void>({
      async queryFn() {
        const response = await fetch(ENV.EXCHANGE_RATE_URL);
        console.log(ENV.EXCHANGE_RATE_URL);
        const data = await response.json();
        return { data: data[0].sale };
      },
    }),
  }),
});

export const { useGetComplectationsQuery, useGetRateQuery } = detailsPanelApi;
