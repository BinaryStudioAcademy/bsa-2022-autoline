import React, { FC, ReactElement } from 'react';

import { AutocompleteValueType } from '@common/types/cars/autocomplete.type';
import { ArrowDown } from '@components/common/icons/arrow-down/arrow-down';
import { Autocomplete, TextField } from '@mui/material';
import isEqual from 'lodash.isequal';

import styles from './styles.module.scss';

interface Props {
  label: string;
  filterName?: string;
  options: AutocompleteValueType[];
  value: AutocompleteValueType[];
  onChange: (data: { filterName: string; list: string[] }) => void;
}

const MultiselectInput: FC<Props> = ({
  label,
  filterName,
  options,
  value,
  onChange,
}): ReactElement => {
  const handleSelectChange = (values: AutocompleteValueType[]): void => {
    const ids = values.map((value) => value?.id || '');

    onChange({ filterName: filterName || '', list: ids });
  };

  const notChosenOptions = options.filter(
    (option) => !value.map((item) => item?.id).includes(option?.id),
  );

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={notChosenOptions}
      value={value}
      className={styles.autocompleteField}
      onChange={(event, value): void => handleSelectChange(value)}
      popupIcon={<ArrowDown />}
      renderInput={(params): JSX.Element => (
        <TextField {...params} label={label} />
      )}
    />
  );
};

const multiselectPropsAreEqual = (
  prevProps: Props,
  newProps: Props,
): boolean => {
  return (
    isEqual(prevProps.value, newProps.value) &&
    isEqual(prevProps.options, newProps.options)
  );
};

export const MemoizedMultiselectInput = React.memo(
  MultiselectInput,
  multiselectPropsAreEqual,
);
