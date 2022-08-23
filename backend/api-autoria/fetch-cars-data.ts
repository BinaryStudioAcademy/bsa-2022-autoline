import * as fs from 'fs';

import { ENV } from '@common/enums/app/env.enum';
import axios from 'axios';

const BASE_URL = 'https://developers.ria.com/auto';
const API_KEY = ENV.API.AUTORIA_API_KEY;
const category = 1; //passenger cars

const urls = [
  {
    name: 'manufacturers',
    url: `/countries?api_key=${API_KEY}`,
  },
  {
    name: 'colors',
    url: `/colors?api_key=${API_KEY}`,
  },
  {
    name: 'drivetrains',
    url: `/categories/${category}/driverTypes?api_key=${API_KEY}`,
  },
  {
    name: 'fuel-types',
    url: `/type?api_key=${API_KEY}`,
  },
  {
    name: 'transmission-types',
    url: `/categories/${category}/gearboxes?api_key=${API_KEY}`,
  },
  {
    name: 'body-types',
    url: `/categories/${category}/bodystyles?api_key=${API_KEY}`,
  },
  {
    name: 'regions',
    url: `/states?api_key=${API_KEY}`,
  },
];

urls.forEach(async ({ name, url }) => {
  const response = await axios.get(`${BASE_URL}/${url}`);
  fs.writeFileSync(
    `${__dirname}/cars/fetched-data/${name}.json`,
    JSON.stringify(response.data),
  );

  if (name === 'regions') {
    const all_cities = [];

    for (const region of response.data) {
      const { value } = region;
      const cities = await axios.get(
        `${BASE_URL}/states/${value}/cities?api_key=${API_KEY}`,
      );
      const result = {
        data: cities.data,
        regionId: value,
      };
      all_cities.push(result);
    }

    fs.writeFileSync(
      `${__dirname}/cars/fetched-data/cities.json`,
      JSON.stringify(all_cities),
    );
  }
});
