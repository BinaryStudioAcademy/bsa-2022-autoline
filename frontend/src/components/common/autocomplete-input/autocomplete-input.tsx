import React, { FC } from 'react';

import styles from '@components/simple-auto-filter/styles.module.scss';
import { Autocomplete, SvgIcon, TextField } from '@mui/material';

import {
  AutocompleteDataType,
  AutocompleteValueType,
} from '../../../types/autocomplete.type';

interface Props {
  label: string;
  onChange: (data: AutocompleteDataType) => void;
  options: {
    label: string;
    id: string;
  }[];
  value: AutocompleteValueType;
}

const AutocompleteInput: FC<Props> = (props): JSX.Element => {
  const handleSelectChange = (value: AutocompleteValueType): void => {
    props.onChange({
      value,
      name: props.label,
    });
  };

  return (
    <Autocomplete
      {...props}
      options={props.options}
      className={styles.autocompleteField}
      onChange={(event, value): void =>
        handleSelectChange(value || { label: '', id: '' })
      }
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
        <TextField {...params} label={props.label} />
      )}
    />
  );
};

export { AutocompleteInput };
