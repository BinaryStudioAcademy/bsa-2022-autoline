import { ENV } from '@common/enums/app/env.enum';
import { AutoriaRequestParams } from '@common/types/types';
import axios from 'axios';

// TODO Add to config
const URL = 'https://developers.ria.com/auto/search';

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
  const response = await axios.get(URL, {
    params: {
      api_key: ENV.APP.AUTORIA_API_KEY,
      ...requestParams,
    },
  });
  return response.data;
};

export { getCarsAutoRia };
