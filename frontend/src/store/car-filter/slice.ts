import {
  CheckListsNames,
  RangeNames,
} from '@common/enums/cars/filter-names.enum';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rangeFilters: {
    year: {
      yearStart: '',
      yearEnd: '',
    },
    price: {
      priceStart: '',
      priceEnd: '',
    },
    race: {
      raceStart: '',
      raceEnd: '',
    },
  },
  checkLists: {
    regionId: [],
    bodytypeId: [],
    colorId: [],
    transmissionTypeId: [],
    fueltypeId: [],
    drivetrainId: [],
  },
  brandDetails: [
    {
      id: Date.now().toString(),
      brandId: '',
      modelId: '',
      brandName: '',
      modelName: '',
    },
  ],
};

const { reducer, actions } = createSlice({
  name: 'car-filter',
  initialState,
  reducers: {
    setRangeValue: (state, action) => {
      const { values } = action.payload;
      const rangeName = action.payload.rangeName as RangeNames;
      state.rangeFilters[rangeName] = values;
    },
    setCheckListValue: (state, action) => {
      state.checkLists = {
        ...state.checkLists,
        [action.payload.filterName]: action.payload.value,
      };
    },
    setBrandDetailsValue: (state, action) => {
      const needle = state.brandDetails.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (needle !== -1) {
        state.brandDetails[needle] = action.payload;
      }
    },
    addNewBrandDetails: ({ brandDetails }) => {
      brandDetails.push({
        ...initialState.brandDetails[0],
        id: Date.now().toString(),
      });
    },
    removeRangeFilter: (state, action) => {
      const rangeName = action.payload.filterName as RangeNames;
      state.rangeFilters = {
        ...state.rangeFilters,
        [rangeName]: initialState.rangeFilters[rangeName],
      };
    },
    removeCheckListFilter: (state, action) => {
      const { id } = action.payload;
      const filterName = action.payload.filterName as CheckListsNames;

      state.checkLists[filterName] = state.checkLists[filterName].filter(
        (item) => item !== id,
      );
    },
    removeBrandDetailsFilter: (state, action) => {
      const { filterName, id } = action.payload;

      if (filterName === 'brandId') {
        state.brandDetails = state.brandDetails.filter(
          (details) => details.brandId !== id,
        );
      }
      if (filterName === 'modelId') {
        state.brandDetails.forEach(
          (detail) => detail.modelId === id && (detail.modelId = ''),
        );
      }
    },
    resetAllFilters: () => initialState,
  },
  extraReducers: {},
});

export const {
  setCheckListValue,
  setRangeValue,
  addNewBrandDetails,
  setBrandDetailsValue,
  resetAllFilters,
  removeCheckListFilter,
  removeBrandDetailsFilter,
  removeRangeFilter,
} = actions;

export { reducer };
