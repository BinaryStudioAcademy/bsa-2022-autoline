import { AutoRiaOption } from '@autoline/shared/common/types/types';
import { AutocompleteValueType } from '@common/types/cars/autocomplete.type';
import { createSelector } from '@reduxjs/toolkit';
import { carsApi } from '@store/queries/cars';

const selectOptions = carsApi.endpoints.getUsedOptions.select();

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
  (options) => {
    return (
      options &&
      Object.fromEntries(
        options.map((option) => {
          const value = {
            id: option.id || '',
            label: option.name || '',
          } as AutocompleteValueType;
          return [option.id, value];
        }),
      )
    );
  },
);

export {
  selectAllOptionsFlat,
  selectOptionsInAutocompleteType,
  selectNormalizedOptionsInAutocompleteType,
};
