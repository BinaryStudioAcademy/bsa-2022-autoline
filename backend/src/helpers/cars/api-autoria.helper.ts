import { AutoRiaUrls } from '@common/enums/app/app';
import { ENV } from '@common/enums/app/env.enum';
import { AutoriaRequestParams } from '@common/types/types';
import { AutoriaResponse } from '@common/types/types';
import axios from 'axios';
import { Response } from 'express';

const getCarsAutoRia = async (
  requestParams: Partial<AutoriaRequestParams>,
): Promise<AutoriaResponse | undefined> => {
  const response = await axios.get(AutoRiaUrls.SEARCH_URL, {
    params: {
      api_key: ENV.APP.AUTORIA_API_KEY,
      ...requestParams,
    },
  });
  return response.data;
};

const getCarById = async (id: string): Promise<Response | undefined> => {
  const requestParams = { auto_id: id };
  const response = await axios.get(AutoRiaUrls.INFO_URL, {
    params: {
      api_key: ENV.APP.AUTORIA_API_KEY,
      ...requestParams,
    },
  });
  return response.data;
};

export { getCarsAutoRia, getCarById };
