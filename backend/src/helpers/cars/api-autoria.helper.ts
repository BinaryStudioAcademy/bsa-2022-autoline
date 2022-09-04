import { ENV } from '@common/enums/app/env.enum';
import { AutoriaRequestParams } from '@common/types/types';
import axios from 'axios';
import { Response } from 'express';

// TODO Add to config
const URL = 'https://developers.ria.com/auto/search';

interface AutoriaResponse {
  additional_params: { page: string };
  result: {
    search_result: {
      ids: string[];
      count: number;
      last_id: number;
    };
  };
}

const getCarsAutoRia = async (
  requestParams: Partial<AutoriaRequestParams>,
): Promise<AutoriaResponse | undefined> => {
  const response = await axios.get(URL, {
    params: {
      api_key: ENV.APP.AUTORIA_API_KEY,
      ...requestParams,
    },
  });
  return response.data;
};

const idURL = 'https://developers.ria.com/auto/info';
const getCarById = async (id: string): Promise<Response | undefined> => {
  const requestParams = { auto_id: id };
  const response = await axios.get(idURL, {
    params: {
      api_key: ENV.APP.AUTORIA_API_KEY,
      ...requestParams,
    },
  });
  return response.data;
};

export { getCarsAutoRia, getCarById };
