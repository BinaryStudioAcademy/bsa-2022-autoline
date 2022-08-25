import { SelectChangeEvent } from '@mui/material';

export type SelectFieldPropsType = {
  name: string;
  value?: string;
  children: React.ReactNode;
  id?: string;
  disabled?: boolean;
  className?: string;
  required: boolean;
  errors?: string;
  onChange?: (event: SelectChangeEvent) => void;
  onClose?: (event: SelectChangeEvent) => void;
};
