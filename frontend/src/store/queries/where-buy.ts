import { whereBuyPath } from '@common/enums/enums';

import { api } from './index';

interface WhereBuyInterface {
  USD: number;
  autoData: {
    description: string;
    year: number;
    autoId: number;
    race: string;
  };
  linkToView: string;
  markName: string;
  modelName: string;
}

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
