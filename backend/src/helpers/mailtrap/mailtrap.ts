import { ENV } from '@common/enums/app/app';
import nodemailer from 'nodemailer';

const sendEmail = async (
  email: string,
  subject: string,
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

  const options = {
    from: ENV.MAILTRAP.FROM_EMAIL,
    to: email,
    subject: subject,
    html: template,
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
