import { whereBuyPath } from '@common/enums/enums';
import { WhereBuyInterface } from '@common/types/where-to-buy/where-to-buy';
import { setAdverts } from '@store/root-reducer';

import { api } from './index';

interface whereBuyQuery {
  page: number;
  complectationId: string;
}

const whereBuyApi = api.injectEndpoints({
  endpoints: (build) => ({
    getWhereBuy: build.query<WhereBuyInterface[], whereBuyQuery>({
      query: ({ page, complectationId }) => ({
        url: `${whereBuyPath.WHERE_BUY}`,
        method: 'GET',
        params: {
          page: page,
          id: complectationId,
        },
      }),
      async onQueryStarted(
        { page, complectationId },
        { dispatch, queryFulfilled },
      ) {
        try {
          const { data: adverts } = await queryFulfilled;
          console.log('ми в новому query', page, complectationId, adverts);
          dispatch(setAdverts({ adverts }));
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const { useGetWhereBuyQuery } = whereBuyApi;
