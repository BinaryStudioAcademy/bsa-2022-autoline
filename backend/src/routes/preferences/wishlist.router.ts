import * as wishlistController from '@controllers/preferences/wishlist.controller';
import { Router } from 'express';

const PATH = '/wishlist';

const wishlistRouter = Router();

wishlistRouter.post(`${PATH}/:userId`, wishlistController.setWishlist);

export { wishlistRouter };
