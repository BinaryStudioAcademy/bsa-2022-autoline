import { RoutPath } from '@common/enums/app/route-path.enum';
import { newCars } from '@controllers/new-cars/new-cars';
import { Router } from 'express';

const newCarsRouter = Router();

newCarsRouter.get(RoutPath.NEW_CARS, newCars);

export { newCarsRouter };
