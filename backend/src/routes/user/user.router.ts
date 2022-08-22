import { getUsers, updateUser } from '@controllers/users/users.controller';
//import { adminAuthMiddleware } from '@middlewares/middlewares';
import { Router } from 'express';

const PATH = '/users';

const userRouter = Router();

// adminAuthMiddleware must be added here
userRouter.get(`${PATH}`, getUsers);

userRouter.patch(`${PATH}/:id`, updateUser);

export { userRouter };
