import { Resolver } from 'react-hook-form';

import { ValidationSchema } from '@common/types/types';
import { yupResolver } from '@hookform/resolvers/yup';

const getFormValidationResolver = (
  validationSchema: ValidationSchema<object>,
): Resolver => {
  return yupResolver(validationSchema);
};

export { getFormValidationResolver };
