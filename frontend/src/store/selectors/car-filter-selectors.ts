import { AutoRiaOption, BrandType } from '@autoline/shared/common/types/types';
import { AutocompleteValueType } from '@common/types/cars/autocomplete.type';
import { BrandDetailsType } from '@common/types/cars/brand-details.type';
import { CarFiltersType } from '@common/types/cars/filters.type';
import { rangeFiltersToObject } from '@helpers/car-filters/range-filters-to-object';
import { objectToQueryArr } from '@helpers/object-to-query';
import { createSelector } from '@reduxjs/toolkit';
import { carsApi } from '@store/queries/cars';

const selectOptions = carsApi.endpoints.getUsedOptions.select();

const selectFiltersQueryArr = createSelector(
  [(state): CarFiltersType => state.carFilter],
  (filters) =>
    objectToQueryArr({
      ...rangeFiltersToObject(filters.rangeFilters),
      ...filters.checkLists,
      brandId: filters.brandDetails.map((item) => item.brandId),
      modelId: filters.brandDetails.flatMap((item) => item.modelIds),
    }),
);

const selectNormalizedBrands = createSelector(
  [carsApi.endpoints.getBrands.select()],
  ({ data: brands }) => {
    if (!brands) return;

    return brands.reduce(
      (obj, item) => Object.assign(obj, { [item.id]: item }),
      {},
    ) as { [p: string]: BrandType };
  },
);

const selectAppliedBrands = createSelector(
  [(state): BrandDetailsType[] => state.carFilter.brandDetails],
  (brandDetails) => {
    const arr: string[] = [];
    brandDetails.forEach((item: BrandDetailsType) => {
      if (item.brandId !== '') arr.push(item.brandId);
    });

    return arr;
  },
);

const selectNotAppliedBrands = createSelector(
  [carsApi.endpoints.getBrands.select(), selectAppliedBrands],
  (allBrands, appliedBrandIds) => {
    if (!allBrands.data && !appliedBrandIds.length) return;

    return allBrands?.data?.filter(
      (brand) => !appliedBrandIds.includes(brand.id),
    );
  },
);

const selectAllOptionsFlat = createSelector(
  selectOptions,
  (options) =>
    options.data &&
    (Object.values(options.data).flatMap((item) => item) as AutoRiaOption[]),
);

const selectOptionsInAutocompleteType = createSelector(
  [selectOptions],
  (options) => {
    return (
      options.data &&
      Object.fromEntries(
        Object.entries(options.data).map(([key, value]) => [
          key,
          value.map(
            (item) =>
              ({ label: item.name, id: item.id } as AutocompleteValueType),
          ),
        ]),
      )
    );
  },
);

const selectNormalizedOptionsInAutocompleteType = createSelector(
  [selectAllOptionsFlat],
  (options): { [p: string]: AutocompleteValueType } | undefined => {
    return (
      options &&
      options.reduce(
        (obj, { id, name }) =>
          Object.assign(obj, {
            [id]: { id: id || '', label: name || '' },
          }),
        {},
      )
    );
  },
);

export {
  selectAllOptionsFlat,
  selectOptionsInAutocompleteType,
  selectNormalizedOptionsInAutocompleteType,
  selectNormalizedBrands,
  selectAppliedBrands,
  selectNotAppliedBrands,
  selectFiltersQueryArr,
};
