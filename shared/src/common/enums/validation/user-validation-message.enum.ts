import { UserValidationRule } from './user-validation-rule.enum.js';

const UserValidationMessage = {
  EMAIL_REQUIRED: 'Email is required',
  INVALID_EMAIL: 'Email is invalid',
  INVALID_EMAIL_LENGTH: 'Email length is incorrect',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_MIN_LENGTH: `Password must be at least ${UserValidationRule.PASSWORD_MIN_LENGTH} characters long`,
  PASSWORD_MAX_LENGTH: `Password must be at most ${UserValidationRule.PASSWORD_MAX_LENGTH} characters long`,
  PASSWORDS_NOT_MATCH: 'Passwords must match',
};

export { UserValidationMessage };
