import { RangeNames } from '@common/enums/car/car-filters-names.enum';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    enginePower: {
      enginePowerStart: '',
      enginePowerEnd: '',
    },
    engineDisplacement: {
      engineDisplacementStart: '',
      engineDisplacementEnd: '',
    },
  },
  checkLists: {
    regionId: [],
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
      modelIds: [],
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
    removeBrandDetails: ({ brandDetails }, action: PayloadAction<string>) => {
      brandDetails.splice(
        brandDetails.findIndex((detail) => detail.id === action.payload),
        1,
      );
    },
    resetAllFilters: () => initialState,
  },
  extraReducers: {},
});

export const {
  setRangeValue,
  setCheckListValue,
  addNewBrandDetails,
  removeBrandDetails,
  setBrandDetailsValue,
  resetAllFilters,
} = actions;

export { reducer };
