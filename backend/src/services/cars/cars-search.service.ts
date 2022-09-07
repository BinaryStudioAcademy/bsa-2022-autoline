import { AutoriaRequestParams } from '@common/types/cars/autoria-request-params';
import { prisma } from '@data/prisma-client';

const carsSearchAutoria = async (
  complectationId: string[],
  page = '0',
  countpage = 10,
): Promise<Partial<AutoriaRequestParams>> => {
  const result: Partial<AutoriaRequestParams> = {
    category_id: 1,
    power_name: 1,
    countpage,
    page,
  };

  const complectation = await prisma.complectation.findUniqueOrThrow({
    where: {
      id: complectationId,
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

  Object.assign(result, {
    'body_type[0]': complectation.model.body_type?.autoria_code,
    'marka_id[0]': complectation.model.brand?.autoria_code,
    'model_id[0]': complectation.model.autoria_code,
    's_yers[0]': complectation.model.year_start,
    'po_yers[0]': complectation.model.year_end,
    'engineVolumeFrom[0]': complectation.engine_displacement.toNumber(),
    'engineVolumeTo[0]': complectation.engine_displacement.toNumber(),
    'powerFrom[0]': complectation.engine_power,
    'powerTo[0]': complectation.engine_power,
    'price_ot[0]': complectation.prices_ranges[0].price_start,
    'price_do[0]': complectation.prices_ranges[0].price_end,
    'color_id[0]': complectation.color?.autoria_code,
    'gear_id[0]': complectation.transmission_type?.autoria_code,
    'type_id[0]': complectation.fuel_type?.autoria_code,
    'drive_id[0]': complectation.drivetrain?.autoria_code,
  });

  return result;
};

export { carsSearchAutoria };
