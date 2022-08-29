import { UserValidationMessage } from '@common/enums/enums';
import * as Yup from 'yup';

const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(150, 'Full name must not exceed 150 characters')
    .matches(
      /^[A-Za-z]+[A-Za-z\s]+[A-Za-z]+$/,
      'Full name must contain only latin characters',
    ),
  email: Yup.string()
    .required(UserValidationMessage.EMAIL_REQUIRED)
    .email(UserValidationMessage.INVALID_EMAIL)
    .matches(/^[A-Za-z0-9.\-_]*@/, UserValidationMessage.INVALID_EMAIL)
    .matches(/@[A-Za-z0-9.\-_]*$/, UserValidationMessage.INVALID_EMAIL)
    .matches(/^[\S]{1,35}@/, UserValidationMessage.INVALID_EMAIL_LENGTH)
    .matches(/@[\S]{3,35}$/, UserValidationMessage.INVALID_EMAIL_LENGTH),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password must not exceed 50 characters')
    .matches(
      /^[A-Za-z0-9\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/,
      'Password must contain only latin, special characters or digits',
    ),
});

export { signUpSchema };
