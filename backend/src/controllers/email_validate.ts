// import { prisma } from '@data/prisma-client';
import { getUserSecurity } from '@services/verification/activate.service';
import httpStatus from 'http-status-codes';

import type { TypedRequestQuery } from '@common/types/controller/controller';
import type { Response } from 'express';

type EmailActivationRequestQuery = {
  link: string;
};

// const token =
//   'eyJhbGciOiJIUzId1NisIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhcmFzaXVrczIzMDNAZ21haWwuY29tIiwiaXNBY3RpdmF0ZWQiOmZhbHNlLCJpYXQiOjE2NjAwNjc0NjEsImV4cCI6MTY2MDY3MjI2MX0.SNsQgfd6q2uXBTz9QBuuwKvkPY0s91ru5Uwk8n_mzio';
// const user = {
//   user_id: '3f6847d7-36dc-45bc-8d71-64e9e1f5d608',
//   password: 'sdfssdfdffg',
//   password_change_token: 'sdfsdsddffgdfgdfg',
//   email_activation_token: token,
//   email_change_token: 'sdsssdsfsdf',
//   email_provisional: 'sfdgdfssdfgdgdfg',
//   refresh_token: 'sdfdfgsdffgsdfgfd',
//   google_acc_id: null,
//   facebook_acc_id: null,
// };

const activate = async (
  req: TypedRequestQuery<EmailActivationRequestQuery>,
  res: Response,
  // next: NextFunction,
): Promise<void> => {
  try {
    const activationLink = req.params.link;
    const a = activationLink.slice(1);
    const user = await getUserSecurity(a);
    res.json(user).status(httpStatus.CREATED);
  } catch (e) {
    console.log(e);
  }
};

export { activate };
