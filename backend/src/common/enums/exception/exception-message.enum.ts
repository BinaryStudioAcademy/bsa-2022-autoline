const ExceptionMessage = {
  USER_EXISTS: 'Account with this email already exists.',
  UNAUTHORIZED_USER: 'Unauthorized user.',
  INCORRECT_CREDENTIALS:
    'Your authentication information is incorrect. Please try again.',
} as const;

export { ExceptionMessage };
