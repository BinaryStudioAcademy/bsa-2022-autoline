import * as wishlistController from '@controllers/preferences/wishlist.controller';
import { userAuthMiddleware } from '@middlewares/middlewares';
import { Router } from 'express';

const PATH = '/wishlist';

const wishlistRouter = Router();

wishlistRouter.post(
  `${PATH}`,
  userAuthMiddleware,
  wishlistController.setWishlist,
);

wishlistRouter.delete(
  `${PATH}`,
  userAuthMiddleware,
  wishlistController.deleteWishlist,
);

wishlistRouter.get(
  `${PATH}`,
  userAuthMiddleware,
  wishlistController.getWishlistByUserId,
);

wishlistRouter.get(
  `${PATH}/entries`,
  userAuthMiddleware,
  wishlistController.getWishlistEntries,
);

export { wishlistRouter };
