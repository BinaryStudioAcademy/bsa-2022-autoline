import { CarsSearchParams } from '@autoline/shared';
import { prisma } from '@data/prisma-client';
import { Model } from '@prisma/client';
// fix return type
const carsSearch = async (data: CarsSearchParams): Promise<Model> =>
  await prisma.model.findMany({
    include: {
      body_type: true,
      brand: true,
      prices_ranges: true,
      complectations: {
        where: {
          color_id: {
            in: data.colorId,
          },
          transmission_type_id: {
            in: data.transmissionTypeId,
          },
          drivetrain_id: {
            in: data.drivetrainId,
          },
          fuel_type_id: {
            in: data.fuelTypeId,
          },
        },
        include: {
          color: true,
          options: true,
          transmission_type: true,
          drivetrain: true,
          fuel_type: true,
        },
      },
    },
    where: {
      id: {
        in: data.modelId,
      },
      body_type: {
        id: {
          in: data.bodyTypeId,
        },
      },
      brand: {
        id: {
          in: data.brandId,
        },
      },
      year_start: {
        gte: data.yearStart ? +data.yearStart : undefined,
      },
      year_end: {
        lte: data.yearEnd
          ? +data.yearEnd === new Date().getFullYear()
            ? undefined
            : +data.yearEnd
          : undefined,
      },
      prices_ranges: {
        some: {
          price_start: {
            gte: data.priceStart ? +data.priceStart : undefined,
          },
          price_end: {
            lte: data.priceEnd ? +data.priceEnd : undefined,
          },
        },
      },
      complectations: {
        some: {
          color_id: {
            in: data.colorId,
          },
          transmission_type_id: {
            in: data.transmissionTypeId,
          },
          drivetrain_id: {
            in: data.drivetrainId,
          },
          fuel_type_id: {
            in: data.fuelTypeId,
          },
        },
      },
    },
  });

export { carsSearch };
