import { Control } from 'react-hook-form';

import { SelectChangeEvent } from '@mui/material';

export type SelectFieldFormPropsType = {
  name: string;
  value?: string;
  children: React.ReactNode;
  id?: string;
  onChange?: (event: SelectChangeEvent) => void;
  onClose?: (event: SelectChangeEvent) => void;
  className?: string;
  required: boolean;
  errors?: string;
  control: Control;
  defaultValue?: string;
  label: string;
};
