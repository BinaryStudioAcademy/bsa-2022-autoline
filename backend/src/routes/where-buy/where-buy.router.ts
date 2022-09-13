import { RoutPath } from '@common/enums/app/route-path.enum';
import { whereToBuy } from '@controllers/where-to-buy/where-to-buy';
import { Router } from 'express';

const whereBuyRouter = Router();

whereBuyRouter.get(RoutPath.WHERE_BUY, whereToBuy);

export { whereBuyRouter };
