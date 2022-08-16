import { ENV } from '@common/enums/app/env.enum';
import { AutoriaRequestParams } from '@common/types/types';
import axios from 'axios';

const URL = 'https://developers.ria.com/auto/search';

const getCarsAutoRia = async (
  car: AutoriaRequestParams,
): Promise<Response | undefined | null[]> => {
  try {
    if (car) {
      let params: object = {};

      params = car.model
        ? car.model.reduce(
            (prev, model, index) =>
              Object.assign(prev, {
                [`body_type[${index}]`]: model.body_type?.autoria_code,
                [`marka_id[${index}]`]: model.brand?.autoria_code,
                [`model_id[${index}]`]: model.autoria_code,
                [`s_yers[${index}]`]: car.yearStart,
                [`po_yers[${index}]`]: car.yearEnd,
              }),
            {},
          )
        : {};

      delete car.model;
      delete car.yearStart;
      delete car.yearEnd;

      Object.assign(params, car);

      const response = await axios.get(URL, {
        params: {
          api_key: ENV.APP.AUTORIA_API_KEY,
          ...params,
        },
      });
      return response.data;
    }
    return [];
  } catch (error) {
    console.log(error);
  }
};

export { getCarsAutoRia };
