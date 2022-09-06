import React, { FC, ReactElement } from 'react';

import { AutocompleteValueType } from '@common/types/cars/autocomplete.type';
import { ArrowDown } from '@components/common/icons/arrow-down/arrow-down';
import { Autocomplete, TextField } from '@mui/material';

import styles from './styles.module.scss';

interface Props {
  label: string;
  filterName?: string;
  options: AutocompleteValueType[];
  values: AutocompleteValueType[];
  onChange: (data: { filterName: string; list: string[] }) => void;
}

const MultiselectInput: FC<Props> = ({
  label,
  filterName,
  options,
  values,
  onChange,
}): ReactElement => {
  const handleSelectChange = (values: AutocompleteValueType[]): void => {
    const ids = values.map((value) => value?.id || '');

    onChange({ filterName: filterName || '', list: ids });
  };

  const notChosenOptions = options.filter(
    (option) => !values.map((item) => item?.id).includes(option?.id),
  );

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={notChosenOptions}
      value={values}
      className={styles.autocompleteField}
      onChange={(event, value): void => handleSelectChange(value)}
      popupIcon={<ArrowDown />}
      renderInput={(params): JSX.Element => (
        <TextField {...params} label={label} />
      )}
    />
  );
};

export { MultiselectInput };
