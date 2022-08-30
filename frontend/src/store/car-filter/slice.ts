import {
  CheckListsNames,
  FiltersNames,
} from '@common/enums/car/car-filters-names.enum';
import { CarFiltersType } from '@common/types/cars/filters.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: CarFiltersType = {
  filters: {
    regionId: '',
    yearStart: '',
    yearEnd: '',
    priceStart: '',
    priceEnd: '',
    enginePowerStart: '',
    enginePowerEnd: '',
    engineDisplacementStart: '',
    engineDisplacementEnd: '',
  },
  checkLists: {
    bodyTypeId: [],
    colorId: [],
    transmissionTypeId: [],
    fuelTypeId: [],
    drivetrainId: [],
  },
  brandDetails: [
    {
      id: Date.now().toString(),
      brandId: '',
      modelId: '',
    },
  ],
};

const { reducer, actions } = createSlice({
  name: 'car-filter',
  initialState,
  reducers: {
    setValue: (
      state,
      action: PayloadAction<{
        filterName: FiltersNames;
        value: string;
      }>,
    ) => {
      const { filterName, value } = action.payload;
      state.filters[filterName] = value;
    },
    setCheckListValue: (
      state,
      action: PayloadAction<{
        filterName: CheckListsNames;
        value: string[];
      }>,
    ) => {
      const { filterName, value } = action.payload;
      state.checkLists[filterName] = value;
    },
    setBrandDetailsValue: ({ brandDetails }, action) => {
      const needle = brandDetails.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (needle !== -1) {
        brandDetails[needle] = action.payload;
      }
    },
    addNewBrandDetails: ({ brandDetails }) => {
      brandDetails.push({
        ...initialState.brandDetails[0],
        id: Date.now().toString(),
      });
    },

    resetAllFilters: () => initialState,
  },
  extraReducers: {},
});

export const {
  setValue,
  setCheckListValue,
  addNewBrandDetails,
  setBrandDetailsValue,
  resetAllFilters,
} = actions;

export { reducer };
