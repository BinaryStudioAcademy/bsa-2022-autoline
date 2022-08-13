const MailActivate = {
  ACTIVATE_URL: `${process.env.VITE_API_ORIGIN_URL}/user/verification/`,
  SUCCESS_URL: `${process.env.FRONTEND_URL}/verification-success`,
  FAILED_URL: `${process.env.FRONTEND_URL}/verification-failed`,
  SUBJECT: 'Welcome To AutoLine Community',
};

export { MailActivate };
