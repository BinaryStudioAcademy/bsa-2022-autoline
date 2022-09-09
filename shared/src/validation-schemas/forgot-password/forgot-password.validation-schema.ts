import * as Yup from 'yup';

import {
  UserValidationMessage,
  UserValidationRule,
} from '../../common/enums/enums';

const forgotPassword = Yup.object().shape({
  email: Yup.string()
    .email(UserValidationMessage.INVALID_EMAIL)
    .required(UserValidationMessage.EMAIL_REQUIRED),
});

const resetPassword = Yup.object().shape({
  password: Yup.string()
    .min(
      UserValidationRule.PASSWORD_MIN_LENGTH,
      UserValidationMessage.PASSWORD_MIN_LENGTH,
    )
    .max(
      UserValidationRule.PASSWORD_MAX_LENGTH,
      UserValidationMessage.PASSWORD_MAX_LENGTH,
    )
    .required(UserValidationMessage.PASSWORD_REQUIRED),
  confirmPwd: Yup.string()
    .oneOf([Yup.ref('password')], UserValidationMessage.PASSWORDS_NOT_MATCH)
    .required(UserValidationMessage.PASSWORD_REQUIRED),
});

export { forgotPassword, resetPassword };
