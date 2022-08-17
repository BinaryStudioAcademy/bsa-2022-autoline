import { ENV } from '@common/enums/app/env.enum';
import { AutoriaRequestParams } from '@common/types/types';
import axios from 'axios';

const URL = 'https://developers.ria.com/auto/search';

const getCarsAutoRia = async (
  requestParams: AutoriaRequestParams,
): Promise<Response | undefined> => {
  try {
    const response = await axios.get(URL, {
      params: {
        api_key: ENV.APP.AUTORIA_API_KEY,
        ...requestParams,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getCarsAutoRia };
