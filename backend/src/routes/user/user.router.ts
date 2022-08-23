import { getUsers, updateUser } from '@controllers/users/users.controller';
import { Router } from 'express';

const PATH = '/users';

const userRouter = Router();

// We need to add adminAuthMiddleware here
userRouter.get(`${PATH}`, getUsers);

// We need to add adminAuthMiddleware here
userRouter.patch(`${PATH}/:id`, updateUser);

export { userRouter };
