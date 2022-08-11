// Just for testing
import {
  userAuthMiddleware,
  adminAuthMiddleware,
} from '@middlewares/middlewares';
import { Router } from 'express';

const PATH = '/protected';

const protectedRouter = Router();

protectedRouter.get(`${PATH}/admin`, adminAuthMiddleware, (req, res) => {
  res.json({
    message: 'Hello from admin route',
  });
});

protectedRouter.get(`${PATH}/user`, userAuthMiddleware, (req, res) => {
  res.json({
    message: 'Hello from user route',
  });
});

export { protectedRouter };
