import { prisma } from '@data/prisma-client';

import type { WishlistResponseDto } from '@autoline/shared';
import type { WishlistInput } from '@common/types/types';

const setWishlist = async (
  input: WishlistInput,
): Promise<WishlistResponseDto> => {
  const { userId, modelId, complectationId } = input;

  const wishlist = await prisma.user_Wishlist.findFirst({
    where: {
      user_id: userId,
      model_id: modelId,
      complectation_id: complectationId,
    },
  });

  const { id: newWishlistId } = wishlist
    ? await prisma.user_Wishlist.delete({
        where: {
          id: wishlist.id,
        },
      })
    : await prisma.user_Wishlist.create({
        data: {
          user_id: userId,
          model_id: modelId,
          complectation_id: complectationId,
        },
        select: {
          id: true,
        },
      });

  return {
    wishlistId: newWishlistId,
    modelId: modelId,
    complectationId: complectationId,
  };
};

export { setWishlist };
