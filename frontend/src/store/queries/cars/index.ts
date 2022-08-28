import {
  BrandType,
  ComplectationDetailsType,
  ModelDetailsType,
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
    getModelDetails: builder.query<ModelDetailsType, string>({
      query: (modelId) => `${API.CARS}/model/${modelId}`,
    }),
    getComplectations: builder.query<ComplectationDetailsType[], string[][]>({
      query: (params) => ({
        url: `${API.CARS}/complectations`,
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
  useGetModelDetailsQuery,
  useGetComplectationsQuery,
} = carsApi;
