import * as reviewedCarController from '@controllers/reviewed-cars/reviewed-cars.controller';
import { Router } from 'express';

const PATH = '/reviewed';

const reviewedCarsRouter = Router();

reviewedCarsRouter.get(`${PATH}/:userId`, reviewedCarController.getList);

reviewedCarsRouter.post(`${PATH}/:userId`, reviewedCarController.setCar);

export { reviewedCarsRouter };
