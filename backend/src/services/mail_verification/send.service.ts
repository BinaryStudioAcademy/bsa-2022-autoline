import { ENV } from '@common/enums/app/app';
import nodemailer from 'nodemailer';

import { generateMailToken } from './token.service';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function sendActivationMail(to: string, link: string): Promise<void> {
  await transporter.sendMail({
    from: process.env.SMTO_FROM,
    to,
    subject: 'Welcome To AutoLine Community',
    text: '',
    html: `
                    <div>
                        <h1>Follow the link to activate</h1>
                        <a href="${link}">Activate</a>
                    </div>
                `,
  });
}

const mailSend = (email: string): string => {
  const token = generateMailToken({
    email,
    isActivated: false,
  });

  sendActivationMail(email, `${ENV.MAIL.ACTIVATE_URL}${token}`);

  return token;
};

export { mailSend };
