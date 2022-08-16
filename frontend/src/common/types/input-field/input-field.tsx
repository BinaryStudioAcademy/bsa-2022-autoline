import { FormControl, FormControlErrors } from '@common/types/types';

export type InputFieldPropsType = {
  name: string;
  type: string;
  rows?: number;
  min?: number;
  max?: number;
  errors?: FormControlErrors;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  autoComplete?: string;
  required: boolean;
  control: FormControl;
};
