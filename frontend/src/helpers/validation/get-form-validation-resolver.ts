import { Resolver } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { type SchemaOf as ValidationSchema } from 'yup';

const getFormValidationResolver = (
  validationSchema: ValidationSchema<object>,
): Resolver => yupResolver(validationSchema);

export { getFormValidationResolver };
