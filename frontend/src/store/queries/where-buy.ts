import { whereBuyPath } from '@common/enums/enums';
import {
  WhereBuyResponse,
  whereBuyQuery,
} from '@common/types/where-to-buy/where-to-buy';
import { setAdverts } from '@store/root-reducer';

import { api } from './index';

const whereBuyApi = api.injectEndpoints({
  endpoints: (build) => ({
    getWhereBuy: build.query<WhereBuyResponse, whereBuyQuery>({
      query: ({ page, complectationId, countpage }) => ({
        url: `${whereBuyPath.WHERE_BUY}`,
        method: 'GET',
        params: {
          page,
          id: complectationId,
          countpage,
        },
      }),
      async onQueryStarted(
        { complectationId, page },
        { dispatch, queryFulfilled },
      ) {
        const { data } = await queryFulfilled;
        const adverts = data.advertsInfo;
        const count = data.count;
        dispatch(setAdverts({ adverts, complectationId, page, count }));
      },
    }),
  }),
});

export const { useGetWhereBuyQuery } = whereBuyApi;
