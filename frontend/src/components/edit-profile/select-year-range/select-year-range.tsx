import React from 'react';
import { Control } from 'react-hook-form';

import { MenuItem } from '@mui/material';

import { SelectFieldForm } from '../select-field-form/select-field-form';
import styles from './styles.module.scss';

interface RangeYearProps {
  start: number;
  end: number;
  required: boolean;
  id?: string;
  name: string;
  control: Control;
  label: string;
  defaultValue: string;
}

export const SelectYearRange: React.FC<RangeYearProps> = ({
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
    .map((_, idx) => end - idx);

  return (
    <SelectFieldForm
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
    </SelectFieldForm>
  );
};
