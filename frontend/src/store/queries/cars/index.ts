import {
  BrandType,
  ModelType,
  OptionsType,
} from '@autoline/shared/common/types/types';
import { API } from '@store/queries/api-routes';

import { api } from '..';

export const carsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query<BrandType[], void>({
      query: () => `${API.CARS}/brands`,
    }),
    getModelsOfBrand: builder.query<ModelType[], string>({
      query: (brandId) => `${API.CARS}/brand/${brandId}/models`,
    }),
    getUsedOptions: builder.query<OptionsType, void>({
      query: () => `${API.CARS}/options`,
    }),
    getFilteredCars: builder.query<void, string[][] | undefined>({
      query: (params) => ({
        url: `${API.CARS}/search`,
        params,
      }),
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetModelsOfBrandQuery,
  useGetUsedOptionsQuery,
  useGetFilteredCarsQuery,
} = carsApi;
