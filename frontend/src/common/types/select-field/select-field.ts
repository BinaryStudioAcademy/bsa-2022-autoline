import { SelectChangeEvent } from '@mui/material';

export type SelectFieldPropsType = {
  name: string;
  value?: string;
  children: React.ReactNode;
  id?: string;
  onChange: (event: SelectChangeEvent) => void;
  onClose: (event: SelectChangeEvent) => void;
  className?: string;
  required: boolean;
  errors?: string;
};
