import React, { FC } from 'react';

import { AutocompleteValueType } from '@common/types/cars/autocomplete.type';
import { Autocomplete, SvgIcon, TextField } from '@mui/material';

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
}): JSX.Element => {
  const handleSelectChange = (values: AutocompleteValueType[]): void => {
    const ids = values.map((value) => value?.id || '');

    onChange({ filterName: filterName || '', list: ids });
  };

  const uniqueOptions = options.filter(
    (option) => !value.map((item) => item?.id).includes(option?.id),
  );

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={uniqueOptions}
      value={value}
      className={styles.autocompleteField}
      onChange={(event, value): void => handleSelectChange(value)}
      popupIcon={
        <SvgIcon viewBox="0 0 12 8">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.59 0.100098L6 4.6801L1.41 0.100098L0 1.5101L6 7.5101L12 1.5101L10.59 0.100098Z"
            fill="#C9CFDD"
          />
        </SvgIcon>
      }
      renderInput={(params): JSX.Element => (
        <TextField {...params} label={label} />
      )}
    />
  );
};

export { MultiselectInput };
