import { ENV } from '@common/enums/app/app';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

import { MailActivate } from './constants';
const sendLink = async (email: string, token: string): Promise<void> => {
  const templatePath = `${__dirname}`;
  const transporter = nodemailer.createTransport({
    host: ENV.MAILTRAP.EMAIL_HOST,
    port: Number(ENV.MAIL.PORT_MAIL_SEND_SERVICE),
    auth: {
      user: ENV.MAILTRAP.EMAIL_USERNAME,
      pass: ENV.MAILTRAP.EMAIL_PASSWORD,
    },
  });

  const handlebarOptions: hbs.NodemailerExpressHandlebarsOptions = {
    viewEngine: {
      extname: '.hbs',
      defaultLayout: false,
      partialsDir: templatePath,
    },
    viewPath: templatePath,
    extName: '.hbs',
  };

  transporter.use('compile', hbs(handlebarOptions));

  const options = {
    from: ENV.MAIL.FROM_EMAIL_VALIDATE,
    to: email,
    subject: MailActivate.SUBJECT,
    template: 'email',
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
