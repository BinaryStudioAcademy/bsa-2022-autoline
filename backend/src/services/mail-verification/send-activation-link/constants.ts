import { ENV } from '@common/enums/app/env.enum';

const MailActivate = {
  ACTIVATE_URL: `${ENV.APP.SERVER_DOMAIN}${ENV.API.V1_PREFIX}/user/verification/`,
  SUCCESS_URL: `${ENV.APP.FRONTEND_URL}/verification-success`,
  FAILED_URL: `${ENV.APP.FRONTEND_URL}/verification-failed`,
  SUBJECT: 'Welcome To AutoLine Community',
};

export { MailActivate };
