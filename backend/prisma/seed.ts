import { PrismaClient } from '@prisma/client';
import Prisma from '@prisma/client';

import { carsData } from '../api-autoria/cars/cars-data';
import {
  manufacturers,
  colors,
  bodyTypes,
  drivetrains,
  fuelTypes,
  transmissionTypes,
  regions,
  cities,
} from '../api-autoria/cars/fetched-data/fetched-data';
import { optionsTypes } from '../api-autoria/cars/options-types';
import { City } from '../api-autoria/city-type';
import { OptionType } from '../api-autoria/option-type.enum';
import { users } from './seeds/users';
import { users_security } from './seeds/users-security';

class AutoriaPlainDataDto {
  name: string;
  autoria_code: number;
  constructor(data: { name: string; value: number }) {
    this.name = data.name;
    this.autoria_code = data.value;
  }
}

const prisma = new PrismaClient();

async function main(): Promise<void> {
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
  for (const user_security of users_security) {
    await prisma.user_Security.create({
      data: user_security,
    });
  }
  for (const region of regions) {
    const dataToSeed = new AutoriaPlainDataDto(region);
    const newRegion = await prisma.region.create({
      data: dataToSeed,
    });
    const city = cities.find(
      (city: City) => city.regionId === region.value,
    ) as City;

    for (const data of city.data) {
      await prisma.city.create({
        data: {
          name: data.name,
          autoria_code: data.value,
          region_id: newRegion.id,
        },
      });
    }
  }

  for (const bodyType of bodyTypes) {
    const dataToSeed = new AutoriaPlainDataDto(bodyType);
    await prisma.body_Type.create({
      data: dataToSeed,
    });
  }
  for (const manufacturer_country of manufacturers) {
    const dataToSeed = new AutoriaPlainDataDto(manufacturer_country);
    await prisma.manufacturer_Country.create({
      data: dataToSeed,
    });
  }
  for (const color of colors) {
    const dataToSeed = new AutoriaPlainDataDto(color);
    await prisma.color.create({
      data: dataToSeed,
    });
  }
  for (const drivetrain of drivetrains) {
    const dataToSeed = new AutoriaPlainDataDto(drivetrain);
    await prisma.drivetrain.create({
      data: dataToSeed,
    });
  }
  for (const fuelType of fuelTypes) {
    const dataToSeed = new AutoriaPlainDataDto(fuelType);
    await prisma.fuel_Type.create({
      data: dataToSeed,
    });
  }
  for (const transmissionType of transmissionTypes) {
    const dataToSeed = new AutoriaPlainDataDto(transmissionType);
    await prisma.transmission_Type.create({
      data: dataToSeed,
    });
  }

  for (const option of optionsTypes) {
    await prisma.option.create({
      data: {
        name: option.name,
        autoria_code: option.value,
        type: option.type as OptionType,
      },
    });
  }

  for (const brand of carsData) {
    const newBrand = await prisma.brand.create({
      data: {
        name: brand.name,
        logo_url: brand.logo_url,
        autoria_code: brand.marka_id,
      },
    });

    const brandCountry = await prisma.manufacturer_Country.findFirstOrThrow({
      where: { autoria_code: brand.country_id },
    });

    for (const model of brand.models) {
      const bodyType = await prisma.body_Type.findFirstOrThrow({
        where: { autoria_code: model.autoria_body_type_id },
      });

      const newModel = await prisma.model.create({
        data: {
          manufacturer_id: newBrand.id,
          body_type_id: bodyType.id,
          manufacture_country_id: brandCountry.id,
          name: model.name,
          description: model.description,
          code_name: model.eng,
          year_start: model.year_start,
          year_end: model.year_end,
          photo_urls: model.photo_urls,
          autoria_code: model.model_id,
          prices_ranges: {
            create: {
              price_start: model.price_start,
              price_end: model.price_end || model.price_start,
            },
          },
        },
      });

      for (const complectation of model.complectations) {
        const color = await prisma.color.findFirstOrThrow({
          where: { autoria_code: complectation.autoria_color_id },
        });
        const drivetrain = await prisma.drivetrain.findFirstOrThrow({
          where: { autoria_code: complectation.autoria_drivetrain_id },
        });
        const fuelType = await prisma.fuel_Type.findFirstOrThrow({
          where: { autoria_code: complectation.autoria_fuel_type_id },
        });
        const transmissionType =
          await prisma.transmission_Type.findFirstOrThrow({
            where: { autoria_code: complectation.autoria_transmission_type_id },
          });

        const optionQueries = complectation.options.map(
          async (option) =>
            await prisma.option.findFirstOrThrow({
              where: { autoria_code: option },
            }),
        );

        const optionsFromDB = await Promise.all(optionQueries);

        await prisma.complectation.create({
          data: {
            name: complectation.name,
            model_id: newModel.id,
            engine: complectation.engine,
            engine_displacement: complectation.engine_displacement,
            engine_power: complectation.engine_power,
            color_id: color.id,
            drivetrain_id: drivetrain.id,
            fuel_type_id: fuelType.id,
            transmission_type_id: transmissionType.id,
            options: {
              create: optionsFromDB.map((option) => ({
                option: { connect: { id: option.id } },
              })),
            },
            prices_ranges: {
              create: {
                price_start: complectation.price_start,
                price_end: complectation.price_end || complectation.price_start,
              },
            },
          },
        });
      }
    }
  }
  indicateImportantOptions();
}

const indicateImportantOptions = async (): Promise<void | Prisma.Option[]> => {
  const importantOptions = [...optionsTypes].filter(
    (it) => it.important === 'true',
  );
  const importantOptionsFromDb = await Promise.all(
    importantOptions.map((opt) => getOption(opt.name)),
  );
  importantOptionsFromDb.map((opt) =>
    updateImportantOptions(opt?.id as string),
  );
};

const getOption = async (name: string): Promise<Prisma.Option | null> => {
  const option = await prisma.option.findFirst({
    where: {
      name,
    },
  });
  return option;
};

const updateImportantOptions = async (id: string): Promise<void> => {
  await prisma.complectationsOnOptions.updateMany({
    where: {
      option_id: id,
    },
    data: {
      important: true,
    },
  });
};

main().catch((e): void => {
  // eslint-disable-next-line no-console
  console.log(e);
});
