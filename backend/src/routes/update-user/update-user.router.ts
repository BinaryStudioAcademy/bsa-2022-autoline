import * as userUpdateController from '@controllers/update-user/update-user.controller';
import * as middlewares from '@middlewares/middlewares';
import { Router } from 'express';
import formidableMiddleware from 'express-formidable';

const PATH = '/user';

const updateUserRouter = Router();
updateUserRouter.get(
  `${PATH}`,
  middlewares.userAuthMiddleware,
  userUpdateController.getUser,
);
updateUserRouter.put(
  `${PATH}`,
  middlewares.userAuthMiddleware,
  middlewares.updateUserMiddleware,
  userUpdateController.updateUser,
);
updateUserRouter.put(
  `${PATH}/photo`,
  middlewares.userAuthMiddleware,
  formidableMiddleware(),
  middlewares.photoMiddleware,
  userUpdateController.updateUserPhoto,
);
updateUserRouter.delete(
  `${PATH}`,
  middlewares.userAuthMiddleware,
  userUpdateController.deleteUser,
);
updateUserRouter.patch(
  `${PATH}/oauth`,
  middlewares.userAuthMiddleware,
  userUpdateController.deleteOauthConnections,
);
updateUserRouter.delete(
  `${PATH}/photo`,
  middlewares.userAuthMiddleware,
  userUpdateController.deleteUserPhoto,
);

export { updateUserRouter };
