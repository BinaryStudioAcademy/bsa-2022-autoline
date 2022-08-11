enum AppRoute {
  ROOT = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  NOT_FOUND = '*',
  $ID = ':id',
  MAIL_SACCESSFUL_VALIDATION = '/mail-activate-success',
  MAIL_FAILED_VALIDATION = '/mail-activate-failed',
  NOT_ALLOWED_SEND_MAIL = '/mail-not-allowed',
}

export { AppRoute };
