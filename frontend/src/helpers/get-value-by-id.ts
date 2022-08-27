import { AutoRiaOption } from '@autoline/shared/common/types/cars/options';
import { AutocompleteValueType } from '@common/types/car-filter/autocomplete.type';

export const getValueById = (
  collection: AutoRiaOption[],
  id: string,
): AutocompleteValueType => {
  const needle = collection?.find((item) => item.id === id);
  return {
    label: needle?.name || '',
    id: needle?.id || '',
  };
};
