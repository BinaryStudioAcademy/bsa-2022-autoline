import { ENV } from '@common/enums/app/app';
import nodemailer from 'nodemailer';

import { generateMailToken } from '../token.service';
import { MailActivate } from './constants';
import { getMessage } from './templates/send_verification_link';
const sendMail = async (email: string): Promise<string> => {
  const transporter = nodemailer.createTransport({
    host: ENV.MAILTRAP.EMAIL_HOST,
    port: 587,
    auth: {
      user: ENV.MAILTRAP.EMAIL_USERNAME,
      pass: ENV.MAILTRAP.EMAIL_PASSWORD,
    },
  });

  const token = generateMailToken({
    email,
    isActivated: false,
  });

  const options = {
    from: ENV.MAIL.FROM_EMAIL_VALIDATE,
    to: email,
    subject: MailActivate.SUBJECT,
    html: getMessage(`${MailActivate.ACTIVATE_URL}${token}`),
  };

  transporter.sendMail(options).catch((err) => {
    err = {
      isMailtrap: true,
      message: 'Incorrect email',
    };
    throw err;
  });

  return token;
};

export { sendMail };
