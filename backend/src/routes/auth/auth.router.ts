import * as authController from '@controllers/auth/auth.controller';
import { signUpMiddleware } from '@middlewares/middlewares';
import { Router } from 'express';

const PATH = '/auth';

const authRouter = Router();

authRouter.post(
  `${PATH}/local/signup`,
  signUpMiddleware,
  authController.signupLocal,
);

export { authRouter };
