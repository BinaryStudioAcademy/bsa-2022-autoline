import { ENV } from '@common/enums/app/env.enum';
import { AutoriaRequestParams, CarDetailsResponse } from '@common/types/types';
import axios from 'axios';

// TODO Add to config
const URL = 'https://developers.ria.com/auto';

interface SearchCarsAutoRia {
  result: {
    search_result: {
      ids: string[];
      count: number;
    };
  };
}

const getCarsAutoRia = async (
  requestParams: Partial<AutoriaRequestParams>,
): Promise<SearchCarsAutoRia> => {
  const response = await axios.get(`${URL}/search`, {
    params: {
      api_key: ENV.APP.AUTORIA_API_KEY,
      ...requestParams,
    },
  });
  return response.data;
};

const getCarDetailsAutoRia = async (
  id: string,
): Promise<CarDetailsResponse> => {
  const response = await axios.get(`${URL}/info`, {
    params: {
      api_key: ENV.APP.AUTORIA_API_KEY,
      auto_id: id,
    },
  });
  return response.data;
};

export { getCarsAutoRia, getCarDetailsAutoRia };
