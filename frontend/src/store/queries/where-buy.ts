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
      async onQueryStarted({ complectationId }, { dispatch, queryFulfilled }) {
        try {
          const { data: adverts } = await queryFulfilled;
          dispatch(setAdverts({ adverts, complectationId }));
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const { useGetWhereBuyQuery } = whereBuyApi;
