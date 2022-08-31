import { FiltersNames } from '@common/enums/cars/filters-names.enum';
import { FiltersType } from '@common/types/cars/filters.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: FiltersType = {
  regionId: '',
  yearStart: '',
  yearEnd: '',
  priceStart: '',
  priceEnd: '',
  enginePowerStart: '',
  enginePowerEnd: '',
  engineDisplacementStart: '',
  engineDisplacementEnd: '',
  bodytypeId: [],
  brandId: [],
  modelId: [],
  colorId: [],
  transmissionTypeId: [],
  fueltypeId: [],
  drivetrainId: [],
};

const { reducer, actions } = createSlice({
  name: 'car-filter',
  initialState,
  reducers: {
    setValue: (
      state,
      action: PayloadAction<{
        filterName: FiltersNames;
        value: string | string[];
      }>,
    ) => ({
      ...state,
      [action.payload.filterName]: action.payload.value,
    }),
    resetAllFilters: () => initialState,
  },
  extraReducers: {},
});

export const { setValue, resetAllFilters } = actions;

export { reducer };
