import * as fs from 'fs';

import { ENV } from '@common/enums/app/env.enum';
import axios from 'axios';

const API_KEY = ENV.API.AUTORIA_API_KEY;
const category = 1; //passenger cars

// const fetchAndWrite = (url, filename) => {
//
// }

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
  fs.writeFileSync(
    `${__dirname}/fetched-data/options.json`,
    JSON.stringify(response.data),
  );
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
