import * as authController from '@controllers/auth/auth.controller';
import { errorsHandler, localAuth } from '@middlewares/middlewares';
import { Router } from 'express';

const PATH = '/auth';

const authRouter = Router();

authRouter.post(`${PATH}/local/signup`, authController.signupLocal);

authRouter.post(
  `${PATH}/local/signin`,
  localAuth,
  authController.signinLocal,
  errorsHandler,
);

export { authRouter };
