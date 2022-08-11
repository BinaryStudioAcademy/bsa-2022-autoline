import * as wishlistService from '@services/preferences/wishlist.service';
import httpStatus from 'http-status-codes';

import type { WishlistResponseDto } from '@autoline/shared';
import type { TypedRequestQuery } from '@common/types/controller/controller';
import type { WishlistInput } from '@common/types/types';
import type { NextFunction, Response } from 'express';

const setWishlist = async (
  req: TypedRequestQuery<WishlistInput>,
  res: Response<WishlistResponseDto>,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { modelId, complectationId } = req.query;

    const wishlist: WishlistInput = {
      userId,
      modelId,
      complectationId,
    };

    const wishlistResponseDto = await wishlistService.setWishlist(wishlist);
    res.json(wishlistResponseDto).status(httpStatus.CREATED);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.sendStatus(400);
    }
    next(error);
  }
};

const deleteWishlist = async (
  req: TypedRequestQuery<WishlistInput>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { modelId, complectationId } = req.query;

    const wishlist: WishlistInput = {
      userId,
      modelId,
      complectationId,
    };

    await wishlistService.deleteWishlist(wishlist);
    res.json('Wishlist deleted successfully').status(httpStatus.CREATED);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.sendStatus(404);
    }
    next(error);
  }
};

export { setWishlist, deleteWishlist };