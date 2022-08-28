import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type ExchngeRateState = {
  rateUSD: string;
};

type ResponseThunkType = {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
};
const initialState: ExchngeRateState = {
  rateUSD: '',
};

export const fetchRates = createAsyncThunk('rates/fetchRates', async () => {
  const response = await fetch(
    'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
  );
  return (await response.json()) as Array<ResponseThunkType>;
});

const { reducer } = createSlice({
  name: 'rates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRates.fulfilled, (state, action) => {
      state.rateUSD = action.payload.filter((e) => e.ccy == 'USD')[0].sale;
    });
  },
});

export { reducer };
