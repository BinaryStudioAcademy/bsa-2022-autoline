import { whereBuyPath } from '@common/enums/enums';
import {
  WhereBuyInterface,
  whereBuyQuery,
} from '@common/types/where-to-buy/where-to-buy';
import { setAdverts } from '@store/root-reducer';

import { api } from './index';

const whereBuyApi = api.injectEndpoints({
  endpoints: (build) => ({
    getWhereBuy: build.query<WhereBuyInterface[], whereBuyQuery>({
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
        const { data: adverts } = await queryFulfilled;
        dispatch(setAdverts({ adverts, complectationId, page }));
      },
    }),
  }),
});

export const { useGetWhereBuyQuery } = whereBuyApi;
