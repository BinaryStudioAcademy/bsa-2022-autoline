import { CarsSearchParams, SearchResult } from '@autoline/shared';
import { prisma } from '@data/prisma-client';

const carsSearch = async (data: CarsSearchParams): Promise<SearchResult[]> => {
  const models = await prisma.model.findMany({
    select: {
      id: true,
      complectations: {
        select: {
          id: true,
        },
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
          engine_displacement: {
            gte: data.engineDisplacementStart
              ? +data.engineDisplacementStart
              : undefined,
            lte: data.engineDisplacementEnd
              ? +data.engineDisplacementEnd
              : undefined,
          },
          engine_power: {
            gte: data.enginePowerStart ? +data.enginePowerStart : undefined,
            lte: data.enginePowerEnd ? +data.enginePowerEnd : undefined,
          },
          prices_ranges: {
            some: {
              price_start: {
                lte: data.priceEnd ? +data.priceEnd : undefined,
              },
              price_end: {
                gte: data.priceStart ? +data.priceStart : undefined,
              },
            },
          },
        },
      },
    },
    where: {
      OR: [
        {
          id: {
            in: data.modelId,
          },
        },
        {
          brand: {
            id: {
              in: data.brandId ? data.brandId : data.modelId ? [] : undefined,
            },
          },
        },
      ],
      body_type: {
        id: {
          in: data.bodyTypeId,
        },
      },
      year_start: {
        gte: data.yearStart ? +data.yearStart : undefined,
      },
      year_end: getYearEndCondition(data.yearEnd),
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
          engine_displacement: {
            gte: data.engineDisplacementStart
              ? +data.engineDisplacementStart
              : undefined,
            lte: data.engineDisplacementEnd
              ? +data.engineDisplacementEnd
              : undefined,
          },
          engine_power: {
            gte: data.enginePowerStart ? +data.enginePowerStart : undefined,
            lte: data.enginePowerEnd ? +data.enginePowerEnd : undefined,
          },
          prices_ranges: {
            some: {
              price_start: {
                lte: data.priceEnd ? +data.priceEnd : undefined,
              },
              price_end: {
                gte: data.priceStart ? +data.priceStart : undefined,
              },
            },
          },
        },
      },
    },
  });

  return models.map((model) => ({
    model_id: model.id,
    complectations_id: model.complectations.map(
      (complectation) => complectation.id,
    ),
  }));
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
