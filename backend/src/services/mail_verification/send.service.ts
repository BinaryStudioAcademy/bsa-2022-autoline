import { ENV } from '@common/enums/app/app';
import nodemailer from 'nodemailer';

import { generateTokens } from './token.service';

const transporter = nodemailer.createTransport({
  host: ENV.MAIL.SMTP_HOST,
  port: ENV.MAIL.SMTP_PORT,
  secure: false,
  auth: {
    user: ENV.MAIL.SMTP_USER,
    pass: ENV.MAIL.SMTP_PASSWORD,
  },
});

async function sendActivationMail(to: string, link: string): Promise<void> {
  await transporter.sendMail({
    from: ENV.MAIL.SMTP_USER,
    to,
    subject: 'Account activation on the website ' + ENV.MAIL.API_URL,
    text: '',
    html: `
                    <div>
                        <h1>Follow the link to activate</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `,
  });
}

const mailSend = (email: string): string => {
  const token = generateTokens({
    email,
    isActivated: false,
  });

  sendActivationMail(email, `${ENV.MAIL.ACTIVATE_URL}${token}`);

  return token;
};

export { mailSend };
