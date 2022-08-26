import { FiltersNames } from '@common/enums/cars/filters-names.enum';
// import { FiltersType } from '@common/types/cars/filters.type';
import { BrandDetailsType } from '@common/types/cars/brand-details.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  filters: {
    regionId: '',
    yearStart: '',
    yearEnd: '',
    priceStart: '',
    priceEnd: '',
    raceStart: '',
    raceEnd: '',
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
        value: string | string[];
      }>,
    ) => {
      state.filters = {
        ...state.filters,
        [action.payload.filterName]: action.payload.value,
      };
    },
    addNewBrandDetails: ({ brandDetails }) => {
      brandDetails.push({
        id: Date.now().toString(),
        brandId: '',
        modelId: '',
      });
    },
    changeBrandDetails: (state, action: PayloadAction<BrandDetailsType>) => {
      const old = state.brandDetails
        .filter((item) => item.id !== action.payload.id)
        .sort((a, b) => parseInt(a.id) - parseInt(b.id));

      state.brandDetails = [...old, action.payload];
    },
    resetAllFilters: () => initialState,
  },
  extraReducers: {},
});

export const {
  setValue,
  addNewBrandDetails,
  changeBrandDetails,
  resetAllFilters,
} = actions;

export { reducer };
