import * as wishlistService from '@services/preferences/wishlist.service';
import httpStatus from 'http-status-codes';

import type { WishlistResponseDto } from '@autoline/shared';
import type { TypedRequestBody } from '@common/types/controller/controller';
import type { WishlistInput } from '@common/types/types';
import type { NextFunction, Response } from 'express';

const setModelWishlist = async (
  req: TypedRequestBody<WishlistInput>,
  res: Response<WishlistResponseDto>,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.body.user_id;
    const modelId = req.params.id;
    const wishlist = {
      user_id: userId,
      model_id: modelId,
    };

    const wishlistResponseDto = await wishlistService.setWishlist(wishlist);
    res.json(wishlistResponseDto).status(httpStatus.CREATED);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const setComplectationWishlist = async (
  req: TypedRequestBody<WishlistInput>,
  res: Response<WishlistResponseDto>,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.body.user_id;
    const complectationId = req.params.id;
    const wishlist = {
      user_id: userId,
      complectation_id: complectationId,
    };

    const wishlistResponseDto = await wishlistService.setWishlist(wishlist);
    res.json(wishlistResponseDto).status(httpStatus.CREATED);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { setModelWishlist, setComplectationWishlist };
