// import { prisma } from '@data/prisma-client';
import { activateUserMail } from '@services/verification/activate.service';
import httpStatus from 'http-status-codes';

import type { TypedRequestQuery } from '@common/types/controller/controller';
import type { NextFunction, Response } from 'express';

type EmailActivationRequestQuery = {
  link: string;
};

const token =
  'eyJhbGciOiJIUzI1NisIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhcmFzaXVrczIzMDNAZ21haWwuY29tIiwiaXNBY3RpdmF0ZWQiOmZhbHNlLCJpYXQiOjE2NjAwNjc0NjEsImV4cCI6MTY2MDY3MjI2MX0.SNsQgfd6q2uXBTz9QBuuwKvkPY0s91ru5Uwk8n_mzio';
const user = {
  id: 'hghsjdfdsfkssdf',
  user_id: '42193e5d-94d5-43e7-b8e5-3bfe45f66822',
  password: 'sdfssdfdffg',
  password_change_token: 'sdfsdsddffgdfgdfg',
  email_activation_token: token,
  email_change_token: 'sdsssdsfsdf',
  email_provisional: 'sfdgdfssdfgdgdfg',
  refresh_token: 'sdfdfgsdffgsdfgfd',
  google_acc_id: null,
  facebook_acc_id: null,
};

const activate = async (
  req: TypedRequestQuery<EmailActivationRequestQuery>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const activationLink = req.params.link;
    console.log(activationLink);
    console.log(activateUserMail(user), 'sdsdd');
    res.json(activateUserMail(user)).status(httpStatus.CREATED);
  } catch (e) {
    next(e);
  }
};

export { activate };
