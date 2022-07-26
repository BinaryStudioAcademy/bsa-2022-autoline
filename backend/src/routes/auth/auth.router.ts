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

authRouter.post(
  `${PATH}/local/signin`,
  passportMiddleware.localAuth,
  authController.signinLocal,
);

authRouter.get(`${PATH}/google/sign`, passportMiddleware.googleAuth);

authRouter.get(
  `${PATH}/google/redirect`,
  passportMiddleware.googleMiddleware,
  authController.signOAuthProvider,
);

authRouter.get(`${PATH}/facebook/sign`, passportMiddleware.facebookAuth);

authRouter.get(
  `${PATH}/facebook/redirect`,
  passportMiddleware.facebookMiddleware,
  authController.signOAuthProvider,
);

authRouter.post(
  `${PATH}/local/reset-password-request/:email`,
  authController.resetPasswordRequest,
);
authRouter.get(
  `${PATH}/local/reset-password-check-token`,
  authController.resetPasswordCheckToken,
);
authRouter.post(`${PATH}/local/reset-password`, authController.resetPassword);

authRouter.post(`${PATH}/refreshToken`, authController.refreshToken);

export { authRouter };
