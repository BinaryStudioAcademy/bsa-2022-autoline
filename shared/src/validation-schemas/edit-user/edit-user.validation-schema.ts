import { UserValidationMessage } from '@common/enums/enums';
import * as Yup from 'yup';

const phoneReg = /^(?:\+38)?(0[5-9][0-9]\d{7})$/gm;

const editUserSchema = Yup.object().shape({
  name: Yup.string()
    .required('Full name is required')
    .max(150, 'Full name must not exceed 150 characters')
    .matches(
      /^\s*([a-zA-Z]+\s)*[a-zA-Z]*\s*$/,
      'Full name must contain only latin characters',
    )
    .trim(),
  email: Yup.string()
    .required(UserValidationMessage.EMAIL_REQUIRED)
    .email(UserValidationMessage.INVALID_EMAIL)
    .matches(/^[A-Za-z0-9.\-_]*@/, UserValidationMessage.INVALID_EMAIL)
    .matches(/@[A-Za-z0-9.\-_]*$/, UserValidationMessage.INVALID_EMAIL)
    .matches(/^[\S]{1,35}@/, UserValidationMessage.INVALID_EMAIL_LENGTH)
    .matches(/@[\S]{3,35}$/, UserValidationMessage.INVALID_EMAIL_LENGTH),
  phone: Yup.string().matches(phoneReg, {
    message: 'Phone is invalid',
    excludeEmptyString: true,
  }),
  location: Yup.string()
    .nullable()
    .transform((value) => (value ? value : null))
    .min(2, 'Location must be at least 2 characters')
    .max(150, 'Location must not exceed 150 characters')
    .matches(
      /^\s*([a-zA-Z]+\s)*[a-zA-Z]*\s*$/,
      'Location must contain only latin characters',
    )
    .trim(),
  sex: Yup.string().oneOf(['male', 'female', 'not_known', 'not_appliable']),
  role: Yup.string().oneOf(['user', 'admin']),
});

export { editUserSchema };
