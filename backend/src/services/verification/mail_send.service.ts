import { ENV } from '@common/enums/app/app';
import nodemailer from 'nodemailer';

import { generateTokens } from '../verification/token_email_service';

const transporter = nodemailer.createTransport({
  host: ENV.EMAIL.SMTP_HOST,
  port: ENV.EMAIL.SMTP_PORT,
  secure: false,
  auth: {
    user: ENV.EMAIL.SMTP_USER,
    pass: ENV.EMAIL.SMTP_PASSWORD,
  },
});

async function sendActivationMail(to: string, link: string): Promise<void> {
  await transporter.sendMail({
    from: ENV.EMAIL.SMTP_USER,
    to,
    subject: 'Account activation on the website ' + ENV.EMAIL.API_URL,
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

  sendActivationMail(email, `${ENV.EMAIL.ACTIVATE_URL}${token}`);

  return token;
};

export { mailSend };
