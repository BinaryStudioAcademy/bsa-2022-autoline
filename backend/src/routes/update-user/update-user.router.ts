import * as userUpdateController from '@controllers/update-user/update-user.controller';
import * as middlewares from '@middlewares/middlewares';
import { Router } from 'express';

const PATH = '/user';

const updateUserRouter = Router();

updateUserRouter.put(
  `${PATH}`,
  middlewares.userAuthMiddleware,
  middlewares.updateUserMiddleware,
  userUpdateController.updateUser,
);
updateUserRouter.delete(
  `${PATH}`,
  middlewares.userAuthMiddleware,
  userUpdateController.deleteUser,
);

export { updateUserRouter };
