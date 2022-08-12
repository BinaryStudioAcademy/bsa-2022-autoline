import { ENV } from '@common/enums/app/app';
import nodemailer from 'nodemailer';

import { INodemailerPayload } from '../../../helpers/mailtrap/interfaces/INodemailerPayload';
import { getMessage } from './templates/send_verification_link';
const sendAgainEmail = async (
  email: string,
  subject: string,
  payload: INodemailerPayload,
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: ENV.MAILTRAP.EMAIL_HOST,
    port: 587,
    auth: {
      user: ENV.MAILTRAP.EMAIL_USERNAME,
      pass: ENV.MAILTRAP.EMAIL_PASSWORD,
    },
  });

  const options = {
    from: ENV.MAIL.FROM_EMAIL_VALIDATE,
    to: email,
    subject: subject,
    html: getMessage(payload),
  };

  transporter.sendMail(options).catch((err) => {
    err = {
      isMailtrap: true,
      message: 'Incorrect email',
    };
    throw err;
  });
};

export { sendAgainEmail };
