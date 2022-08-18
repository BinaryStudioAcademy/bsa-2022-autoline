import { CarsSearchParams } from '@autoline/shared';
import { AutoriaRequestParams } from '@common/types/cars/autoria-request-params';
import { prisma } from '@data/prisma-client';

const carsSearch = async (
  data: CarsSearchParams,
): Promise<AutoriaRequestParams> => {
  const result: AutoriaRequestParams = { category_id: 1 };

  if (data.brandId || data.modelId || data.bodyTypeId) {
    const model_from_db = await prisma.model.findMany({
      select: {
        autoria_code: true,
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
      where: {
        id: data.modelId,
        body_type: {
          id: data.bodyTypeId,
        },
        brand: {
          id: {
            in: data.brandId,
          },
        },
      },
    });

    if (model_from_db?.length === 0) throw new Error('NotFoundError');

    model_from_db.forEach((model, index) => {
      Object.assign(result, {
        [`body_type[${index}]`]: model.body_type?.autoria_code,
        [`marka_id[${index}]`]: model.brand?.autoria_code,
        [`model_id[${index}]`]: data.modelId ? model.autoria_code : undefined,
        [`s_yers[${index}]`]: data.yearStart,
        [`po_yers[${index}]`]: data.yearEnd,
      });
    });
  }

  await getData(data.colorId, 'color_id', prisma.color, result);
  await getData(
    data.transmissionTypeId,
    'gear_id',
    prisma.transmission_Type,
    result,
  );
  await getData(data.fuelTypeId, 'type_id', prisma.fuel_Type, result);
  await getData(data.drivetrainId, 'drive_id', prisma.drivetrain, result);

  if (data.regionId || data.cityId) {
    const cityData = await prisma.city.findMany({
      select: {
        autoria_code: true,
        region: {
          select: {
            autoria_code: true,
          },
        },
      },
      where: {
        id: {
          in: data.cityId,
        },
        region: {
          id: {
            in: data.regionId,
          },
        },
      },
    });
    cityData.forEach((city, index) =>
      Object.assign(result, {
        [`city[${index}]`]: data.cityId ? city.autoria_code : undefined,
        [`state[${index}]`]: city.region.autoria_code,
      }),
    );
  }

  result.price_ot = data.priceStart;
  result.price_do = data.priceEnd;

  if (data.enginePowerStart || data.enginePowerEnd) result.power_name = 1;
  result.powerFrom = data.enginePowerStart;
  result.powerTo = data.enginePowerEnd;

  result.engineVolumeFrom = data.engineDisplacementStart;
  result.engineVolumeTo = data.engineDisplacementEnd;

  return result;
};

const getData = async (
  param: string | string[],
  autoria_name: string,
  table:
    | typeof prisma.color
    | typeof prisma.transmission_Type
    | typeof prisma.fuel_Type
    | typeof prisma.drivetrain,
  result: AutoriaRequestParams,
): Promise<void> => {
  if (param) {
    const db_data_list = await table.findMany({
      select: {
        autoria_code: true,
      },
      where: {
        id: {
          in: param,
        },
      },
    });

    if (db_data_list.length === 0) throw new Error('NotFoundError');

    db_data_list.forEach((db_data, index) => {
      Object.assign(result, {
        [`${autoria_name}[${index}]`]: db_data.autoria_code,
      });
    });
  }
};

export { carsSearch };
