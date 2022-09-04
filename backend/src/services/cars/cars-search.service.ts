import { AutoriaRequestParams } from '@common/types/cars/autoria-request-params';
import { prisma } from '@data/prisma-client';

const carsSearchAutoria = async (
  complectationId: string[],
  page = '1',
): Promise<Partial<AutoriaRequestParams>> => {
  const result: Partial<AutoriaRequestParams> = {
    category_id: 1,
    power_name: 1,
    countpage: 5,
    page: page,
  };

  const complectations = await prisma.complectation.findMany({
    where: {
      id: {
        in: complectationId,
      },
    },
    select: {
      engine_displacement: true,
      engine_power: true,
      color: {
        select: {
          autoria_code: true,
        },
      },
      drivetrain: {
        select: {
          autoria_code: true,
        },
      },
      transmission_type: {
        select: {
          autoria_code: true,
        },
      },
      fuel_type: {
        select: {
          autoria_code: true,
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
          autoria_code: true,
          year_start: true,
          year_end: true,
          body_type: {
            select: {
              autoria_code: true,
            },
          },
          brand: {
            select: {
              autoria_code: true,
            },
          },
        },
      },
    },
  });

  complectations.forEach((complectation, index) => {
    Object.assign(result, {
      [`body_type[${index}]`]: complectation.model.body_type?.autoria_code,
      [`marka_id[${index}]`]: complectation.model.brand?.autoria_code,
      [`model_id[${index}]`]: complectation.model.autoria_code,
      [`s_yers[${index}]`]: complectation.model.year_start,
      [`po_yers[${index}]`]: complectation.model.year_end,
      [`engineVolumeFrom[${index}]`]:
        complectation.engine_displacement.toNumber(),
      [`engineVolumeTo[${index}]`]:
        complectation.engine_displacement.toNumber(),
      [`powerFrom[${index}]`]: complectation.engine_power,
      [`powerTo[${index}]`]: complectation.engine_power,
      // [`price_ot[${index}]`]: complectation.prices_ranges[0].price_start,
      // [`price_do[${index}]`]: complectation.prices_ranges[0].price_end,
      // [`color_id[${index}]`]: complectation.color?.autoria_code,
      [`gear_id[${index}]`]: complectation.transmission_type?.autoria_code,
      [`type_id[${index}]`]: complectation.fuel_type?.autoria_code,
      [`drive_id[${index}]`]: complectation.drivetrain?.autoria_code,
    });
  });

  return result;
};

export { carsSearchAutoria };
