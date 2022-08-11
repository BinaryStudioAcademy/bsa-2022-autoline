import * as authController from '@controllers/auth/auth.controller';
import * as passportMiddleware from '@middlewares/middlewares';
import { Router } from 'express';

const PATH = '/auth';

const authRouter = Router();

authRouter.post(
  `${PATH}/local/signup`,
  passportMiddleware.signUpMiddleware,
  authController.signupLocal,
);

export { authRouter };
