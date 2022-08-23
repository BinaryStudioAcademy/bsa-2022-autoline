import React from 'react';
import { Control } from 'react-hook-form';

import { SelectField } from '@components/common/select-field/select-field';
import { MenuItem } from '@mui/material';

import styles from './styles.module.scss';

interface RangeYearsProps {
  start: number;
  end: number;
  required: boolean;
  id?: string;
  name: string;
  control: Control;
  label: string;
  defaultValue: string;
}

export const SelectYearsRange: React.FC<RangeYearsProps> = ({
  start,
  end,
  required,
  id,
  name,
  control,
  label,
  defaultValue,
}) => {
  const years = Array(end - start + 1)
    .fill(0)
    .map((_, idx) => start + idx);

  return (
    <SelectField
      id={id}
      name={name}
      required={required}
      className={styles.select}
      control={control}
      label={label}
      defaultValue={defaultValue}
    >
      <MenuItem value={defaultValue}>Rather not say</MenuItem>
      {years.map((year) => (
        <MenuItem key={year} value={year.toString()}>
          {year}
        </MenuItem>
      ))}
    </SelectField>
  );
};
