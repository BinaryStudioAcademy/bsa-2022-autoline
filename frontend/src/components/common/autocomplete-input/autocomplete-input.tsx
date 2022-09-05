import React, { FC } from 'react';

import { AutocompleteValueType } from '@common/types/cars/autocomplete.type';
import { ArrowDown } from '@components/common/icons/icons';
import { Autocomplete, TextField } from '@mui/material';

import styles from './styles.module.scss';

interface Props {
  label: string;
  options: AutocompleteValueType[];
  value: AutocompleteValueType;
  onChange: (data: AutocompleteValueType) => void;
}

const AutocompleteInput: FC<Props> = (props): JSX.Element => {
  const handleSelectChange = (data: AutocompleteValueType): void => {
    props.onChange(data);
  };

  return (
    <Autocomplete
      {...props}
      className={styles.autocompleteField}
      onChange={(event, value): void =>
        handleSelectChange(value || { label: '', id: '' })
      }
      popupIcon={<ArrowDown />}
      renderInput={(params): JSX.Element => (
        <TextField {...params} label={props.label} />
      )}
    />
  );
};

export { AutocompleteInput };
