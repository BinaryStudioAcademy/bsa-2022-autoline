import { ENV } from '@common/enums/app/app';
import { errorsHandler } from '@middlewares/middlewares';
import {
  healthRouter,
  authRouter,
  userRouter,
  activateRouter,
  wishlistRouter,
  carsRouter,
  activateLinkRouter,
  complectationsRouter,
  updateUserRouter,
  viewedCarsRouter,
  locationRouter,
  newCarsRouter,
  whereBuyRouter,
  comparisonsRouter,
  recentSearchCarsRouter,
  historyOfComparisonsRouter,
} from '@routes/routes';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { carsUpdatePricesFromAutoria } from '@services/cars/cars-update.service';
import cors from 'cors';
import express from 'express';
import * as cron from 'node-cron';

// Express server configuration
const app = express();

Sentry.init({
  environment: ENV.APP.NODE_ENV,
  dsn: ENV.SENTRY.DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],

  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app
  .use(
    cors({
      // Allow everything for dev env to test from the Postman or other API dev tools
      origin: ENV.APP.NODE_ENV === 'development' ? '*' : ENV.APP.FRONTEND_URL,
    }),
  )
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

const routes = [
  healthRouter,
  authRouter,
  userRouter,
  wishlistRouter,
  carsRouter,
  activateRouter,
  activateLinkRouter,
  complectationsRouter,
  updateUserRouter,
  newCarsRouter,
  viewedCarsRouter,
  locationRouter,
  comparisonsRouter,
  whereBuyRouter,
  recentSearchCarsRouter,
  historyOfComparisonsRouter,
];
routes.forEach((route) => app.use(ENV.API.V1_PREFIX, route));

// app.use(Sentry.Handlers.errorHandler());

// Handle arbitrary errors that are thrown from any controller above
app.use(errorsHandler);

app.listen(ENV.APP.SERVER_PORT, ENV.APP.SERVER_HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at ${ENV.APP.SERVER_PORT}`);
});

// The cron task will be executed at every 30th minute
const task = cron.schedule('*/30 * * * *', async () => {
  Sentry.captureMessage(
    'Cron task started: "Cars. Updating prices from AutoRia"',
    'info',
  );
  const carComplectations = await carsUpdatePricesFromAutoria();
  Sentry.captureMessage(
    `Cron task finished: "Cars. Updating prices from AutoRia". Updated car complectations: ${carComplectations.join(
      ', ',
    )}`,
    'info',
  );
});
task.start();
