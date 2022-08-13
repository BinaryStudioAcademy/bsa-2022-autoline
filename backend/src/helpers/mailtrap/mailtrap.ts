import { ENV } from '@common/enums/app/app';
import nodemailer from 'nodemailer';

import { INodemailerPayload } from './interfaces/INodemailerPayload';

const sendEmail = async (
  email: string,
  subject: string,
  payload: INodemailerPayload,
  template: string,
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: ENV.MAILTRAP.EMAIL_HOST,
    port: 587,
    auth: {
      user: ENV.MAILTRAP.EMAIL_USERNAME,
      pass: ENV.MAILTRAP.EMAIL_PASSWORD,
    },
  });

  const templateService = await import(template);
  const options = {
    from: ENV.MAILTRAP.FROM_EMAIL,
    to: email,
    subject: subject,
    html: templateService.getMessage(payload),
  };

  transporter.sendMail(options).catch((err) => {
    err = {
      isMailtrap: true,
      message: 'Incorrect email',
    };
    throw err;
  });
};

export { sendEmail };
