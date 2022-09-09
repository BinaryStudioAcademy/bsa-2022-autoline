import {
  BrandType,
  ComplectationDetailsType,
  ModelDetailsType,
  ModelType,
  OptionsType,
} from '@autoline/shared/common/types/types';
import { FilterReturnType } from '@common/types/advanced-auto-filter/advanced-auto-filter';
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
    getComplectationsOfModel: builder.query<ModelType[], string>({
      query: (modelId) => `${API.CARS}/model/${modelId}/complectations`,
    }),
    getUsedOptions: builder.query<OptionsType, void>({
      query: () => `${API.CARS}/options`,
    }),
    getFilteredCars: builder.query<FilterReturnType, string[][] | undefined>({
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
  useLazyGetModelsOfBrandQuery,
  useGetUsedOptionsQuery,
  useLazyGetFilteredCarsQuery,
  useGetModelDetailsQuery,
  useGetComplectationsQuery,
  useGetComplectationsOfModelQuery,
} = carsApi;
