import { Resolver } from 'react-hook-form';

import { ValidationSchema } from '@common/types/types';
import { joiResolver } from '@hookform/resolvers/joi';

const getFormValidationResolver = (
  validationSchema: ValidationSchema<string>,
): Resolver => {
  return joiResolver(validationSchema);
};

export { getFormValidationResolver };
