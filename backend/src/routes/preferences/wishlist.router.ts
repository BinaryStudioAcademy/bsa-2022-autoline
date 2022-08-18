import * as wishlistController from '@controllers/preferences/wishlist.controller';
import { userSignedMiddleware } from '@middlewares/middlewares';
import { Router } from 'express';

const PATH = '/wishlist';

const wishlistRouter = Router();

wishlistRouter.post(
  `${PATH}`,
  userSignedMiddleware,
  wishlistController.setWishlist,
);

wishlistRouter.delete(
  `${PATH}`,
  userSignedMiddleware,
  wishlistController.deleteWishlist,
);

wishlistRouter.get(
  `${PATH}`,
  userSignedMiddleware,
  wishlistController.getWishlistByUserId,
);

export { wishlistRouter };
