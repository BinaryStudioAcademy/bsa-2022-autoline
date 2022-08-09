import { mailSend } from '@services/verification/mail_send.service';

const emailActivate = (): void => {
  console.log(mailSend('tarasiuks2303@gmail.com'));
};

export { emailActivate };
