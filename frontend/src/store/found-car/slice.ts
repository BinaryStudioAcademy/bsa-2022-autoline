import { FilterReturnType } from '@common/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFoundCars {
  cars: FilterReturnType;
}

const initialState: IFoundCars = {
  cars: [],
};

const { reducer, actions } = createSlice({
  name: 'found-cars',
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<FilterReturnType>) => {
      state.cars = action.payload;
    },
  },
  extraReducers: {},
});

export const { setCars } = actions;

export { reducer };
