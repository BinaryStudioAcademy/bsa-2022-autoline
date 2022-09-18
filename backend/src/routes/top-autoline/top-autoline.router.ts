import * as topAutolineController from '@controllers/top-autoline/top-autoline.controller';
import { Router } from 'express';

const PATH = '/top-autoline';

const topAutolineRouter = Router();

topAutolineRouter.get(
  `${PATH}/cars`,
  topAutolineController.getTopAutolineCarsList,
);

export { topAutolineRouter };
