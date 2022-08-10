// import { prisma } from '@data/prisma-client';
import * as userSecurityService from '@services/verification/user_security.service';
import httpStatus from 'http-status-codes';

// import { mailSend } from '../services/verification/mail_send.service';

import type { TypedRequestQuery } from '@common/types/controller/controller';
import type { Response, NextFunction } from 'express';

type EmailActivationRequestQuery = {
  link: string;
};

const token =
  '1111sdmF0ZWQiOmZhbHNlLCJpYXQiOjE2NjAwNjc0NjEsImV4cCI6MTY2MDY3MjI2MX0.SNsQgfd6q2uXBTz9QBuuwKvkPY0s91ru5Uwk8n_mzio';
const user = {
  user_id: '6af007c7-fc8e-4de1-927f-58868846cf94',
  password: 'sdfssdfdffg',
  password_change_token: 'sdfsdsddffgdfgdfg',
  email_activation_token: token,
  email_change_token: 'null',
  email_provisional: 'null',
  refresh_token: 'null',
  google_acc_id: null,
  facebook_acc_id: null,
};

const activate = async (
  req: TypedRequestQuery<EmailActivationRequestQuery>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userToken = req.params.link;

    // const a = activationLink.slice(1);
    const user = await userSecurityService.getUserSecurity(userToken);
    if (!user) {
      res.status(httpStatus.FORBIDDEN).json({ error: 'Not valid link' });
    } else {
      const { id } = user;
      const userResult = await userSecurityService.editEmailTokenField(id);
      console.log(userResult);
      return res.redirect('http://localhost:3000/mail-success');
      // res.status(httpStatus.ACCEPTED).json(userResult);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const sendmail = async (
  req: TypedRequestQuery<EmailActivationRequestQuery>,
  res: Response,
  // next: NextFunction,
): Promise<void> => {
  try {
    const userSec = await userSecurityService.addUserSecurity(user);
    res.json(userSec).status(httpStatus.CREATED);

    // const token = mailSend('setarasiuk@gmail.com');
    // res.json({ token: token }).status(httpStatus.CREATED);
  } catch (e) {
    console.log(e);
  }
};

export { activate, sendmail };
