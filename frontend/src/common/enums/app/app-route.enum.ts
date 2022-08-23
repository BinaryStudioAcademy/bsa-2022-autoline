enum AppRoute {
  ROOT = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  ADMINISTRATION = '/administration',
  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD = '/reset-password',
  NOT_FOUND = '*',
  $ID = ':id',
  MAIL_SUCCESS_VALIDATION = '/verification-success',
  MAIL_FAILED_VALIDATION = '/verification-failed',
  PERSONAL = '/personal-page',
}

export { AppRoute };
