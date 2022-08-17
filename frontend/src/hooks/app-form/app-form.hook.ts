import {
  useForm,
  UseFormHandleSubmit,
  Control,
  FieldErrors,
  FieldValues,
} from 'react-hook-form';

import { getFormValidationResolver } from '@helpers/helpers';
import { type SchemaOf as ValidationSchema } from 'yup';

type UseAppFormArgs = {
  defaultValues: Record<string, unknown>;
  validationSchema?: ValidationSchema<object>;
};
type UseAppFormResult<T extends FieldValues = FieldValues> = {
  control: Control;
  errors: FieldErrors;
  handleSubmit: UseFormHandleSubmit<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
  validationSchema,
  defaultValues,
}: UseAppFormArgs): UseAppFormResult<T> => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
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
