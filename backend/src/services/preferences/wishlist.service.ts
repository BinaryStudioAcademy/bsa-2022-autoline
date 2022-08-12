import { prisma } from '@data/prisma-client';

import type { WishlistResponseDto } from '@autoline/shared';
import type { WishlistInput } from '@common/types/types';

const setWishlist = async (
  input: WishlistInput,
): Promise<WishlistResponseDto> => {
  const { user_id, model_id, complectation_id } = input;

  const wishlist = await prisma.user_Wishlist.findFirst({
    where: {
      user_id,
      model_id,
      complectation_id,
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
          user_id,
          model_id,
          complectation_id,
        },
        select: {
          id: true,
        },
      });

  return {
    wishlistId: newWishlistId,
    modelId: model_id,
    complectationId: complectation_id,
  };
};

export { setWishlist };
