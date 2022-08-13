import { ENV } from '@common/enums/app/app';
import nodemailer from 'nodemailer';

import { MailActivate } from './constants';
import { getMessage } from './templates/send_verification_link';
const sendMail = async (email: string, token: string): Promise<string> => {
  const transporter = nodemailer.createTransport({
    host: ENV.MAILTRAP.EMAIL_HOST,
    port: Number(ENV.MAIL.PORT_MAIL_SEND_SERVICE),
    auth: {
      user: ENV.MAILTRAP.EMAIL_USERNAME,
      pass: ENV.MAILTRAP.EMAIL_PASSWORD,
    },
  });

  const options = {
    from: ENV.MAIL.FROM_EMAIL_VALIDATE,
    to: email,
    subject: MailActivate.SUBJECT,
    html: getMessage(`${MailActivate.ACTIVATE_URL}${token}`),
  };

  transporter.sendMail(options).catch((err) => {
    throw err;
  });

  return token;
};

export { sendMail };
