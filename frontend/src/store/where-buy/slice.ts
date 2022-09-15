import { WhereBuyState } from '@common/types/where-to-buy/where-to-buy';
import { createSlice } from '@reduxjs/toolkit';

const initialState: WhereBuyState = {
  ads: [],
};

const { reducer, actions } = createSlice({
  name: 'advert',
  initialState,
  reducers: {
    setAdverts: (state, action) => {
      const { complectationId, adverts, page } = action.payload;
      const activeComplectation = state.ads.find(
        (advert) => advert.complectationId === complectationId,
      );
      if (activeComplectation) {
        page
          ? (activeComplectation.adverts = [
              ...activeComplectation.adverts,
              ...adverts,
            ])
          : (activeComplectation.adverts = [...adverts]);
      } else {
        const newComplectation = { complectationId, adverts, page: 0 };
        state.ads = [...state.ads, newComplectation];
      }
    },
    setPage: (state, action) => {
      const { complectationId, page } = action.payload;
      const activeComplectation = state.ads.find(
        (advert) => advert.complectationId === complectationId,
      );
      if (!activeComplectation) {
        const newComplectation = {
          complectationId,
          adverts: [],
          page: 0,
        };
        state.ads = [...state.ads, newComplectation];
      } else if (page === 0) {
        activeComplectation.page = page;
      } else {
        activeComplectation.page = activeComplectation.page + 1;
      }
    },
  },
  extraReducers: {},
});

export const { setAdverts, setPage } = actions;
export { reducer };
