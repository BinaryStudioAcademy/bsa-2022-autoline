import { ApiPath } from '@autoline/shared/common/enums/enums';
import {
  ModelReturnedData,
  ComplectationReturnedData,
} from '@autoline/shared/common/types/types';
import { DetailsCarPanelPropsType } from '@common/types/types';

import { api } from './index';

const EXCHANGE_RATE_API =
  'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

export const detailsPanelApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getComplectationsForPanel: builder.query<
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
        const response = await fetch(EXCHANGE_RATE_API);
        const data = await response.json();
        return { data: data[0].sale };
      },
    }),
  }),
});

export const { useGetComplectationsForPanelQuery, useGetRateQuery } =
  detailsPanelApi;
