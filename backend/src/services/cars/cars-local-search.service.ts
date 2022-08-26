import { CarsSearchParams } from '@autoline/shared';
import { SearchResult } from '@common/types/types';
import { prisma } from '@data/prisma-client';

const carsSearch = async (data: CarsSearchParams): Promise<SearchResult[]> => {
  return prisma.model.findMany({
    include: {
      body_type: true,
      brand: true,
      prices_ranges: {
        where: {
          price_start: {
            gte: data.priceStart ? +data.priceStart : undefined,
          },
          price_end: {
            lte: data.priceEnd ? +data.priceEnd : undefined,
          },
        },
      },
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
      year_end: getYearEndCondition(data.yearEnd),
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
};

const getYearEndCondition = (
  yearEnd: string,
): null | { lte: number | undefined } => {
  let yearEndCondition;

  if (+yearEnd === new Date().getFullYear()) {
    yearEndCondition = null;
  } else {
    yearEndCondition = {
      lte: yearEnd ? +yearEnd : undefined,
    };
  }

  return yearEndCondition;
};

export { carsSearch };
