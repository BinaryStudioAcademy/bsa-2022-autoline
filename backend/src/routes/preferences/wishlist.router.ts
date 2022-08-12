import * as wishlistController from '@controllers/preferences/wishlist.controller';
import { Router } from 'express';

const PATH = '/wishlist';

const wishlistRouter = Router();

wishlistRouter.post(`${PATH}/model/:id`, wishlistController.setModelWishlist);

wishlistRouter.post(
  `${PATH}/complectation/:id`,
  wishlistController.setComplectationWishlist,
);

export { wishlistRouter };
