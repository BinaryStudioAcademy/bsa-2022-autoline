import React from 'react';

import { SelectField } from '@components/common/select-field/select-field';
import { MenuItem, SelectChangeEvent } from '@mui/material';

import styles from './styles.module.scss';

interface RangeYearsProps {
  start: number;
  end: number;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  onClose: (event: SelectChangeEvent) => void;
  required: boolean;
  id?: string;
  name: string;
}

export const SelectYearsRange: React.FC<RangeYearsProps> = ({
  start,
  end,
  value,
  onChange,
  onClose,
  required,
  id,
  name,
}) => {
  const years = Array(end - start + 1)
    .fill(0)
    .map((_, idx) => start + idx);

  return (
    <SelectField
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onClose={onClose}
      required={required}
      className={styles.select}
    >
      {years.map((year) => (
        <MenuItem key={year} value={year.toString()}>
          {year}
        </MenuItem>
      ))}
    </SelectField>
  );
};
