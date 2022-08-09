import * as authController from '@controllers/auth/auth.controller';
import { Router } from 'express';

const PATH = '/auth';

const authRouter = Router();

authRouter.post(`${PATH}/local/signup`, authController.signupLocal);
export { authRouter };
