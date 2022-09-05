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
      console.log('ми тут');
      const { adverts } = action.payload;
      console.log(adverts, 'hjjk');
      state.adverts = [...state.adverts, ...adverts];
      console.log('ми тут', state.adverts);
    },
  },
  extraReducers: {},
});

export const { setAdverts } = actions;
export { reducer };
