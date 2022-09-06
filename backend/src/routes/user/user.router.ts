import { getUsers, updateUser } from '@controllers/users/users.controller';
import {
  adminAuthMiddleware,
  editUserMiddleware,
} from '@middlewares/middlewares';
import { Router } from 'express';

const PATH = '/users';

const userRouter = Router();

userRouter.get(`${PATH}`, adminAuthMiddleware, getUsers);

userRouter.patch(
  `${PATH}/:id`,
  adminAuthMiddleware,
  editUserMiddleware,
  updateUser,
);

export { userRouter };
