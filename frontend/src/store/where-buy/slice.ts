import { WhereBuyInterface } from '@common/types/where-to-buy/where-to-buy';
import { createSlice } from '@reduxjs/toolkit';

type WhereBuyState = {
  advert: WhereBuyInterface[];
};

const initialState: WhereBuyState = {
  advert: [],
};

const { reducer, actions } = createSlice({
  name: 'advert',
  initialState,
  reducers: {
    setAdverts: (state, action) => {
      const { adverts } = action.payload;
      state.advert = [...state.advert, ...adverts];
    },
  },
  extraReducers: {},
});

export const { setAdverts } = actions;
export { reducer };
