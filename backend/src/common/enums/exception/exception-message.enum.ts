const ExceptionMessage = {
  USER_EXISTS: 'Account with this email already exists.',
  UNAUTHORIZED_USER: 'Unauthorized user.',
  INCORRECT_CREDENTIALS:
    'Your authentication information is incorrect. Please try again.',
  NOT_ENOUGH_PERMISSIONS:
    'You do not have enough permissions to perform this action.',
  USER_NOT_EXIST: 'The user does not exist ',
} as const;

export { ExceptionMessage };
