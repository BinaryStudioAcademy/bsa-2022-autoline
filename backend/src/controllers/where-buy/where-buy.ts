// import { getCarsAutoRia } from '@helpers/cars/cars';
import { carProperties } from '@services/where-buy/cars-properties';

import type { Response, NextFunction, Request } from 'express';

const whereBuy = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // const cars = await getCarsAutoRia({ 'bodystyle[0]': 3 });
    const carProp = await carProperties('12ab45f7-c52c-4be0-9eb6-1a333954dd43');
    console.log('qwa', carProp);
    res.json('Hi');
  } catch (error) {
    next(error);
  }
};

export { whereBuy };
