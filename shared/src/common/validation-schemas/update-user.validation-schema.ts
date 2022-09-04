import { UserValidationMessage } from '@common/enums/validation/user-validation-message.enum';
import * as Yup from 'yup';

const urlReg =
  /((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/gm;
const phoneReg = /^(?:\+38)?(0[5-9][0-9]\d{7})$/gm;

const updateUserSchema = Yup.object().shape({
  name: Yup.string()
    .required('Full name is required')
    .max(150, 'Full name must not exceed 100 characters'),
  email: Yup.string()
    .required(UserValidationMessage.EMAIL_REQUIRED)
    .email(UserValidationMessage.INVALID_EMAIL)
    .matches(/^[A-Za-z0-9.\-_]*@/, UserValidationMessage.INVALID_EMAIL)
    .matches(/@[A-Za-z0-9.\-_]*$/, UserValidationMessage.INVALID_EMAIL)
    .matches(/^[\S]{1,35}@/, UserValidationMessage.INVALID_EMAIL_LENGTH)
    .matches(/@.{3,35}?\./, UserValidationMessage.INVALID_EMAIL_LENGTH),
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
    .transform((value) => (value === '' ? null : value))
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must not exceed 20 characters')
    .nullable(),
  repeatNewPassword: Yup.string()
    .transform((value) => (value === '' ? null : value))
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must not exceed 20 characters')
    .nullable(),
  photoUrl: Yup.string().matches(urlReg, 'Photo url should be a valid URL'),
  sex: Yup.string().oneOf(['male', 'female', 'not_known', 'not_appliable']),
});

export { updateUserSchema };
