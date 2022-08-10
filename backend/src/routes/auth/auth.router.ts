import * as authController from '@controllers/auth/auth.controller';
import * as passportMiddleware from '@middlewares/middlewares';
import { Router } from 'express';

const PATH = '/auth';

const authRouter = Router();

authRouter.post(`${PATH}/local/signup`, authController.signupLocal);

authRouter.post(
  `${PATH}/local/signin`,
  passportMiddleware.localAuth,
  authController.signinLocal,
);

authRouter.get(
  `${PATH}/local/reset-password/:email`,
  authController.resetPasswordRequest,
);
authRouter.get(
  `${PATH}/local/reset-password`,
  authController.resetPasswordCheckToken,
);
authRouter.post(`${PATH}/local/reset-password`, authController.resetPassword);

export { authRouter };
