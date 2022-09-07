import { UserValidationMessage } from '@common/enums/validation/user-validation-message.enum';
import * as Yup from 'yup';

const urlReg =
  /((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/gm;
const phoneReg = /^(?:\+38)?(0[5-9][0-9]\d{7})$/gm;

const updateUserSchema = Yup.object().shape({
  name: Yup.string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
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
    .matches(/^[\S]{1,35}@/, UserValidationMessage.INVALID_EMAIL)
    .matches(/@.{4,35}?\./, UserValidationMessage.INVALID_EMAIL),
  phone: Yup.string()
    .transform((value) => (value === '' ? null : value))
    .matches(phoneReg, 'Phone is invalid')
    .nullable(),
  location: Yup.string()
    .oneOf(['kyiv', 'kharkiv', 'odesa', 'not_appliable', null])
    .nullable(),
  birthYear: Yup.lazy((value) => {
    if (value == 'not_appliable') {
      return Yup.string();
    }

    return Yup.number()
      .min(new Date().getFullYear() - 110)
      .max(new Date().getFullYear())
      .nullable();
  }),
  password: Yup.string()
    .transform((value) => (value === '' ? null : value))
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must not exceed 20 characters')
    .nullable(),
  newPassword: Yup.string()
    .when('password', {
      is: (password: string) => password !== null && password.length > 0,
      then: Yup.string()
        .required('Password is required')
        .typeError('Password is required'),
    })
    .transform((value) => (value === '' ? null : value))
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must not exceed 20 characters')
    .nullable(),
  repeatNewPassword: Yup.string()
    .when('password', {
      is: (password: string) => password !== null && password.length > 0,
      then: Yup.string()
        .required('Please, repeat the password')
        .typeError('Please, repeat the password'),
    })
    .transform((value) => (value === '' ? null : value))
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must not exceed 20 characters')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .nullable(),
  photoUrl: Yup.string().matches(urlReg, 'Photo url should be a valid URL'),
  sex: Yup.string().oneOf(['male', 'female', 'not_known', 'not_appliable']),
});

export { updateUserSchema };
