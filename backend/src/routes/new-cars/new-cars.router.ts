import { RoutPath } from '@common/enums/app/route-path.enum';
import { getNewCars } from '@controllers/new-cars/new-cars';
import { guestAuthMiddleware } from '@middlewares/roles-based-protection/role.middleware';
import { Router } from 'express';

const newCarsRouter = Router();

newCarsRouter.get(RoutPath.NEW_CARS, guestAuthMiddleware, getNewCars);

export { newCarsRouter };
