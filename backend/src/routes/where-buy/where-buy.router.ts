import { RoutPath } from '@common/enums/app/route-path.enum';
import { whereBuy } from '@controllers/where-buy/where-buy';
import { Router } from 'express';

const whereBuyRouter = Router();

whereBuyRouter.get(RoutPath.WHERE_BUY, whereBuy);

export { whereBuyRouter };
