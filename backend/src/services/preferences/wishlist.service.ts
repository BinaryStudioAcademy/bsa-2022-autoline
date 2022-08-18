import { prisma } from '@data/prisma-client';

import type {
  ComplectationResponseDto,
  ModelResponseDto,
  WishlistResponseDto,
  WishlistsResponseDto,
} from '@autoline/shared/common/types/types';
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

  if (wishlist) {
    throw new Error('Wishlist already exists');
  }

  const { id: newWishlistId } = await prisma.user_Wishlist.create({
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
          body_type: {
            select: {
              name: true,
            },
          },
          manufacture_country: {
            select: {
              name: true,
            },
          },
          prices_ranges: {
            select: {
              price_start: true,
              price_end: true,
            },
          },
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
      id: wishlist.id,
      createdAt: wishlist.created_at,
      name: wishlist.model?.name,
      yearStart: wishlist.model?.year_start,
      yearEnd: wishlist.model?.year_end,
      photoUrls: wishlist.model?.photo_urls,
      brand: {
        name: wishlist.model?.brand.name,
        logoUrl: wishlist.model?.brand.logo_url,
      },
      bodyType: wishlist.model?.body_type.name,
      manufactureCountry: wishlist.model?.manufacture_country.name,
      pricesRanges: wishlist.model?.prices_ranges,
    } as ModelResponseDto;

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
          engine: true,
          engine_displacement: true,
          engine_power: true,
          color: {
            select: {
              name: true,
            },
          },
          drivetrain: {
            select: {
              name: true,
            },
          },
          fuel_type: {
            select: {
              name: true,
            },
          },
          transmission_type: {
            select: {
              name: true,
            },
          },
          prices_ranges: {
            select: {
              price_start: true,
              price_end: true,
            },
          },
          model: {
            select: {
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
              body_type: {
                select: {
                  name: true,
                },
              },
              manufacture_country: {
                select: {
                  name: true,
                },
              },
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
        id: wishlist.id,
        createdAt: wishlist.created_at,
        engine: wishlist.complectation?.engine,
        engineDisplacement:
          wishlist.complectation?.engine_displacement.toNumber(),
        enginePower: wishlist.complectation?.engine_power,
        color: {
          name: wishlist.complectation?.color.name,
        },
        drivetrain: wishlist.complectation?.drivetrain.name,
        fuelType: wishlist.complectation?.fuel_type.name,
        transmissionType: wishlist.complectation?.transmission_type.name,
        pricesRanges: wishlist.complectation?.prices_ranges,
        name: modelData?.name,
        yearStart: modelData?.year_start,
        yearEnd: modelData?.year_end,
        photoUrls: modelData?.photo_urls,
        brand: {
          name: modelData?.brand.name,
          logoUrl: modelData?.brand.logo_url,
        },
        bodyType: modelData?.body_type.name,
        manufactureCountry: modelData?.manufacture_country.name,
      } as ComplectationResponseDto;

      return data;
    },
  );

  const wishlists: WishlistsResponseDto = {
    models: sanitizedModelsWishlist,
    complectations: sanitizedComplectationsWishlist,
  };

  return wishlists;
};

export { setWishlist, deleteWishlist, getWishlistByUserId };
