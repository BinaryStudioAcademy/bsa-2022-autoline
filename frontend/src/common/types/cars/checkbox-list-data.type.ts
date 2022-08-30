import { CheckListsNames } from '@common/enums/car/car-filters-names.enum';

export type CheckboxListDataType = {
  filterName: CheckListsNames;
  data: string[];
};
