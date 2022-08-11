import * as fs from 'fs';

import axios, { AxiosResponse } from 'axios';

const API_KEY = 'your api key';
const category = 1; //passenger cars
const brandsLimit = 5;
const modelsLimit = 5;

const brandsIDs: number[] = [];

const getBrands = async (): Promise<void> => {
  const response = await axios.get(
    `https://developers.ria.com/auto/new/marks?category_id=${category}&limit=${brandsLimit}&api_key=${API_KEY}`,
  );
  const ids = response.data.map(
    (brand: { marka_id: number }) => brand.marka_id,
  );
  brandsIDs.push(...ids);
  await fs.writeFileSync(
    `${__dirname}/fetched-data/brands.json`,
    JSON.stringify(response.data),
  );
};

const getBrandsModels = async (brandsIDs: number[]): Promise<void> => {
  const data: AxiosResponse[] = [];

  const requests = brandsIDs.map((id) =>
    axios.get(
      `https://developers.ria.com/auto/new/models?marka_id=${id}&category_id=${category}&limit=${modelsLimit}&api_key=${API_KEY}`,
    ),
  );
  await Promise.all(requests).then((responses) =>
    responses.forEach((response: AxiosResponse) => data.push(...response.data)),
  );
  fs.writeFileSync(
    `${__dirname}/fetched-data/models.json`,
    JSON.stringify(data),
  );
};

const getManufacturers = async (): Promise<void> => {
  const response = await axios.get(
    `https://developers.ria.com/auto/countries?api_key=${API_KEY}`,
  );
  fs.writeFileSync(
    `${__dirname}/fetched-data/manufacturers.json`,
    JSON.stringify(response.data),
  );
};

const getColors = async (): Promise<void> => {
  const response = await axios.get(
    `https://developers.ria.com/auto/colors?api_key=${API_KEY}`,
  );
  fs.writeFileSync(
    `${__dirname}/fetched-data/colors.json`,
    JSON.stringify(response.data),
  );
};

const getDrivetrains = async (): Promise<void> => {
  const response = await axios.get(
    `https://developers.ria.com/auto/categories/${category}/driverTypes?api_key=${API_KEY}`,
  );
  fs.writeFileSync(
    `${__dirname}/fetched-data/drivetrains.json`,
    JSON.stringify(response.data),
  );
};

const getFuelTypes = async (): Promise<void> => {
  const response = await axios.get(
    `https://developers.ria.com/auto/type?api_key=${API_KEY}`,
  );
  fs.writeFileSync(
    `${__dirname}/fetched-data/fuel-types.json`,
    JSON.stringify(response.data),
  );
};

const getTransmissionTypes = async (): Promise<void> => {
  const response = await axios.get(
    `https://developers.ria.com/auto/categories/${category}/gearboxes?api_key=${API_KEY}`,
  );
  fs.writeFileSync(
    `${__dirname}/fetched-data/transmission-types.json`,
    JSON.stringify(response.data),
  );
};

const getOptions = async (): Promise<void> => {
  const response = await axios.get(
    `https://developers.ria.com/auto/categories/${category}/options?api_key=${API_KEY}`,
  );
  fs.writeFileSync(`${__dirname}/options.json`, JSON.stringify(response.data));
};

const getBodyTypes = async (): Promise<void> => {
  const response = await axios.get(
    `https://developers.ria.com/auto/categories/${category}/bodystyles?api_key=${API_KEY}`,
  );
  fs.writeFileSync(
    `${__dirname}/fetched-data/body-types.json`,
    JSON.stringify(response.data),
  );
};

const main = async (): Promise<void> => {
  await Promise.all([
    await getBrands(),
    await getBrandsModels(brandsIDs as number[]),
    await getManufacturers(),
    await getBodyTypes(),
    await getColors(),
    await getDrivetrains(),
    await getFuelTypes(),
    await getTransmissionTypes(),
    await getOptions(),
  ]);
};

main().catch((e): void => {
  // eslint-disable-next-line no-console
  console.log(e);
});
