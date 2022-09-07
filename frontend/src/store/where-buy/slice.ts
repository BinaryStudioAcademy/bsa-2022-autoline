import { WhereBuyInterface } from '@common/types/where-to-buy/where-to-buy';
import { createSlice } from '@reduxjs/toolkit';

type WhereBuyState = {
  adverts: WhereBuyInterface[];
  complectationId: string;
};

const initialState: WhereBuyState = {
  adverts: [],
  complectationId: '',
};

const { reducer, actions } = createSlice({
  name: 'advert',
  initialState,
  reducers: {
    setAdverts: (state, action) => {
      const { adverts, complectationId } = action.payload;
      if (state.complectationId == complectationId) {
        state.adverts = [...state.adverts, ...adverts];
      } else {
        state.complectationId = complectationId;
        state.adverts = [...adverts];
      }
    },
  },
  extraReducers: {},
});

export const { setAdverts } = actions;
export { reducer };
