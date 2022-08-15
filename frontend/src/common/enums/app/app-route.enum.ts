enum AppRoute {
  ROOT = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  NOT_FOUND = '*',
  $ID = ':id',
  MAIL_SACCESSFUL_VALIDATION = '/verification-success',
  MAIL_FAILED_VALIDATION = '/verification-failed',
}

export { AppRoute };
