import fs from 'fs';
import path from 'path';

import { ENV } from '@common/enums/app/app';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';

const sendEmail = async (
  email: string,
  subject: string,
  payload: unknown,
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

  const source = fs.readFileSync(path.join(__dirname, template), 'utf8');
  const compiledTemplate = handlebars.compile(source);
  const options = {
    from: ENV.MAILTRAP.FROM_EMAIL,
    to: email,
    subject: subject,
    html: compiledTemplate(payload),
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
