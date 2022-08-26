import { getCitiesOfRegion } from '@controllers/location/location.controller';
import { Router } from 'express';

const PATH = '/location';

const locationRouter = Router();

locationRouter.get(`${PATH}/region/:id/cities`, getCitiesOfRegion);

export { locationRouter };
