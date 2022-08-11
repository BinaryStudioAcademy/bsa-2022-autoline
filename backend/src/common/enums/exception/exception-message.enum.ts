const ExceptionMessage = {
  USER_EXISTS: 'Account with this email already exists.',
  UNAUTHORIZED_USER: 'Unauthorized user.',
  INCORRECT_CREDENTIALS:
    'Your authentication information is incorrect. Please try again.',
  NOT_ENOUGH_PERMISSIONS:
    'You do not have enough permission to perform this action.',
} as const;

export { ExceptionMessage };
