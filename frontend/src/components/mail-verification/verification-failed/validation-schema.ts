import * as Yup from 'yup';

const UserValidationMessage = {
  EMAIL_REQUIRED: 'Email is required',
  INVALID_EMAIL: 'Invalid email',
  INVALID_EMAIL_LENGTH: 'Email length is incorrect',
  PASSWORD_REQUIRED: 'Password is required',
  // PASSWORD_MIN_LENGTH: `Password must be at least ${UserValidationRule.PASSWORD_MIN_LENGTH} characters long`,
  // PASSWORD_MAX_LENGTH: `Password must be at most ${UserValidationRule.PASSWORD_MAX_LENGTH} characters long`,
  PASSWORDS_NOT_MATCH: 'Passwords do not match',
};

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .required(UserValidationMessage.EMAIL_REQUIRED)
    .email(UserValidationMessage.INVALID_EMAIL)
    .matches(/^[A-Za-z0-9.\-_]*@/, UserValidationMessage.INVALID_EMAIL)
    .matches(/@[A-Za-z0-9.\-_]*$/, UserValidationMessage.INVALID_EMAIL)
    .matches(/^[\S]{1,35}@/, UserValidationMessage.INVALID_EMAIL_LENGTH)
    .matches(/@[\S]{3,35}$/, UserValidationMessage.INVALID_EMAIL_LENGTH),
});

// declare const emailSchema: Yup.ObjectSchema<
//   import('yup/lib/object').Assign<
//     import('yup/lib/object').ObjectShape,
//     {
//       email: import('yup/lib/string').RequiredStringSchema<
//         string | undefined,
//         import('yup/lib/types').AnyObject
//       >;
//     }
//   >
// >;

export { emailSchema };
