import { prisma } from '@data/prisma-client';

import type {
  CarPreview,
  WishlistResponseDto,
  WishlistsResponseDto,
} from '@autoline/shared/common/types/types';
import type { WishlistInput } from '@common/types/types';

const setWishlist = async (
  input: WishlistInput,
): Promise<WishlistResponseDto> => {
  const { userId, modelId, complectationId, createdAt } = input;

  const wishlist = await prisma.user_Wishlist.findFirst({
    where: {
      user_id: userId,
      model_id: modelId,
      complectation_id: complectationId,
    },
  });

  if (wishlist) {
    throw new Error('Wishlist already exists');
  }

  const { id: newWishlistId } = await prisma.user_Wishlist.create({
    data: {
      user_id: userId,
      model_id: modelId,
      complectation_id: complectationId,
      created_at: createdAt,
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

const deleteWishlist = async (input: WishlistInput): Promise<void> => {
  const { userId, modelId, complectationId } = input;

  const wishlist = await prisma.user_Wishlist.findFirst({
    where: {
      user_id: userId,
      model_id: modelId,
      complectation_id: complectationId,
    },
  });

  if (!wishlist) {
    throw new Error('Wishlist does not exist');
  }

  await prisma.user_Wishlist.delete({
    where: {
      id: wishlist.id,
    },
  });

  return;
};

const getWishlistByUserId = async (
  userId: string,
): Promise<WishlistsResponseDto> => {
  const modelsWishlist = await prisma.user_Wishlist.findMany({
    where: {
      user_id: userId,
      NOT: [
        {
          model_id: null,
        },
      ],
    },
    select: {
      id: true,
      created_at: true,
      model: {
        select: {
          id: true,
          name: true,
          year_start: true,
          year_end: true,
          photo_urls: true,
          brand: {
            select: {
              name: true,
              logo_url: true,
            },
          },
          prices_ranges: {
            select: {
              price_start: true,
              price_end: true,
            },
          },
          description: true,
        },
      },
    },
  });

  const sanitizedModelsWishlist = modelsWishlist.map((wishlist) => {
    if (wishlist.model) {
      wishlist.model.photo_urls = Array.isArray(wishlist.model.photo_urls)
        ? (wishlist.model?.photo_urls as string[])
        : [];
    }

    const data = {
      id: wishlist.model?.id,
      createdAt: wishlist.created_at,
      wishlistId: wishlist.id,
      modelName: wishlist.model?.name,
      yearStart: wishlist.model?.year_start,
      yearEnd: wishlist.model?.year_end,
      photoUrls: wishlist.model?.photo_urls,
      brand: {
        name: wishlist.model?.brand.name,
        logoUrl: wishlist.model?.brand.logo_url,
      },
      pricesRanges: wishlist.model?.prices_ranges,
      description: wishlist.model?.description,
    } as CarPreview;

    return data;
  });

  const complectationsWishlists = await prisma.user_Wishlist.findMany({
    where: {
      user_id: userId,
      NOT: [
        {
          complectation_id: null,
        },
      ],
    },
    select: {
      id: true,
      created_at: true,
      complectation: {
        select: {
          id: true,
          name: true,
          prices_ranges: {
            select: {
              price_start: true,
              price_end: true,
            },
          },
          model: {
            select: {
              id: true,
              name: true,
              year_start: true,
              year_end: true,
              photo_urls: true,
              brand: {
                select: {
                  name: true,
                  logo_url: true,
                },
              },
              description: true,
            },
          },
        },
      },
    },
  });

  const sanitizedComplectationsWishlist = complectationsWishlists.map(
    (wishlist) => {
      const modelData = wishlist.complectation?.model;

      const data = {
        id: wishlist.complectation?.id,
        modelId: wishlist.complectation?.model.id,
        createdAt: wishlist.created_at,
        wishlistId: wishlist.id,
        complectationName: wishlist.complectation?.name,
        pricesRanges: wishlist.complectation?.prices_ranges,
        modelName: modelData?.name,
        yearStart: modelData?.year_start,
        yearEnd: modelData?.year_end,
        photoUrls: modelData?.photo_urls,
        brand: {
          name: modelData?.brand.name,
          logoUrl: modelData?.brand.logo_url,
        },
        description: modelData?.description,
      } as CarPreview;

      return data;
    },
  );

  const wishlists: WishlistsResponseDto = {
    models: sanitizedModelsWishlist,
    complectations: sanitizedComplectationsWishlist,
  };

  return wishlists;
};

const getWishlistEntries = async (userId: string): Promise<string[]> => {
  const wishlists = await prisma.user_Wishlist.findMany({
    where: {
      user_id: userId,
    },
    select: {
      model_id: true,
      complectation_id: true,
    },
  });

  return wishlists.map(
    ({ model_id, complectation_id }) =>
      (model_id as string) || (complectation_id as string),
  );
};

export { setWishlist, deleteWishlist, getWishlistByUserId, getWishlistEntries };
