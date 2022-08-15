import { useForm, UseFormHandleSubmit } from 'react-hook-form';

import {
  FormControl,
  FormControlErrors,
  FormControlValues,
  ValidationSchema,
} from '@common/types/types';
import { getFormValidationResolver } from '@helpers/helpers';

type UseAppFormArgs = {
  defaultValues: Record<string, unknown>;
  validationSchema?: ValidationSchema<string>;
};
type UseAppFormResult<T extends FormControlValues = FormControlValues> = {
  control: FormControl;
  errors: FormControlErrors;
  handleSubmit: UseFormHandleSubmit<T>;
};

const useAppForm = <T extends FormControlValues = FormControlValues>({
  validationSchema,
  defaultValues,
}: UseAppFormArgs): UseAppFormResult<T> => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormControlValues>({
    defaultValues,
    resolver: validationSchema
      ? getFormValidationResolver(validationSchema)
      : undefined,
  });

  return {
    handleSubmit: handleSubmit as UseFormHandleSubmit<T>,
    control,
    errors,
  };
};

export { useAppForm };
