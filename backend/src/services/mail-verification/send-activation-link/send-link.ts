import { ENV } from '@common/enums/app/app';
import nodemailer from 'nodemailer';

import { MailActivate } from './constants';

const sendLink = async (email: string, token: string): Promise<void> => {
  const templatePath =
    '@services/mail-verification/send-activation-link/templates/email-template.ts';

  const templateService = await import(templatePath);
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
    template: 'email',
    html: templateService.getMessage(`${MailActivate.ACTIVATE_URL}${token}`),
    context: {
      link: `${MailActivate.ACTIVATE_URL}${token}`,
    },
  };

  transporter.sendMail(options, function (error, info) {
    if (error) {
      alert(error);
    } else {
      alert('Email sent: ' + info.response);
    }
  });
};

export { sendLink };
