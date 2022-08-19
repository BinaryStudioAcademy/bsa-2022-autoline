import * as Yup from 'yup';

import { UserValidationMessage } from '../../common/enums/enums';

const forgotPassword = Yup.object().shape({
  email: Yup.string()
    .email(UserValidationMessage.INVALID_EMAIL)
    .required(UserValidationMessage.EMAIL_REQUIRED),
});

const resetPassword = Yup.object().shape({
  password: Yup.string()
    .min(8, UserValidationMessage.PASSWORD_MIN_LENGTH)
    .max(150, UserValidationMessage.PASSWORD_MAX_LENGTH)
    .required(UserValidationMessage.PASSWORD_REQUIRED),
  confirmPwd: Yup.string()
    .oneOf([Yup.ref('password')], UserValidationMessage.PASSWORDS_NOT_MATCH)
    .required(UserValidationMessage.PASSWORD_REQUIRED),
});

export { forgotPassword, resetPassword };
