import * as wishlistService from '@services/preferences/wishlist.service';
import httpStatus from 'http-status-codes';

import type { WishlistResponseDto } from '@autoline/shared/common/types/types';
import type { TypedRequestQuery } from '@common/types/controller/controller';
import type { WishlistInput } from '@common/types/types';
import type { NextFunction, Response } from 'express';

const setWishlist = async (
  req: TypedRequestQuery<WishlistInput>,
  res: Response<WishlistResponseDto>,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.tokenPayload.sub;
    const { modelId, complectationId, createdAt } = req.query;

    const wishlist: WishlistInput = {
      userId,
      modelId,
      complectationId,
      createdAt,
    };

    const wishlistResponseDto = await wishlistService.setWishlist(wishlist);
    res.json(wishlistResponseDto).status(httpStatus.CREATED);
  } catch (error) {
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
    const userId = req.tokenPayload.sub;
    const { modelId, complectationId } = req.query;

    const wishlist: WishlistInput = {
      userId,
      modelId,
      complectationId,
    };

    await wishlistService.deleteWishlist(wishlist);
    res.json('Wishlist deleted successfully').status(httpStatus.CREATED);
  } catch (error) {
    if (error instanceof Error) {
      res.sendStatus(404);
    }
    next(error);
  }
};

const getWishlistByUserId = async (
  req: TypedRequestQuery<WishlistInput>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.tokenPayload.sub;

    const wishlistResponseDto = await wishlistService.getWishlistByUserId(
      userId,
    );
    res.json(wishlistResponseDto).status(httpStatus.CREATED);
  } catch (error) {
    if (error instanceof Error) {
      res.sendStatus(404);
    }
    next(error);
  }
};

const getWishlistEntries = async (
  req: TypedRequestQuery<{ user_id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.tokenPayload.sub;

    const wishlists = await wishlistService.getWishlistEntries(userId);
    res.json(wishlists).status(httpStatus.OK);
  } catch (error) {
    if (error instanceof Error) {
      res.sendStatus(404);
    }
    next(error);
  }
};

export { setWishlist, deleteWishlist, getWishlistByUserId, getWishlistEntries };
