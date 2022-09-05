import { WhereBuyInterface } from '@common/types/where-to-buy/where-to-buy';
import { createSlice } from '@reduxjs/toolkit';

type WhereBuyState = {
  adverts: WhereBuyInterface[];
};

const initialState: WhereBuyState = {
  adverts: [],
};

const { reducer, actions } = createSlice({
  name: 'advert',
  initialState,
  reducers: {
    setAdverts: (state, action) => {
      const { adverts } = action.payload;
      state.adverts = [...state.adverts, ...adverts];
    },
  },
  extraReducers: {},
});

export const { setAdverts } = actions;
export { reducer };
