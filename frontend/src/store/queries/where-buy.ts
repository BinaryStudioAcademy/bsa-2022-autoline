import { whereBuyPath } from '@common/enums/enums';
import { WhereBuyInterface } from '@common/types/where-to-buy/where-to-buy';

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
    }),
  }),
});

export const { useGetWhereBuyQuery } = whereBuyApi;
