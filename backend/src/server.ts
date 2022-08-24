import { ENV } from '@common/enums/app/app';
import { errorsHandler } from '@middlewares/middlewares';
import {
  healthRouter,
  authRouter,
  protectedRouter,
  userRouter,
  activateRouter,
  wishlistRouter,
  carsRouter,
  activateLinkRouter,
  updateUserRouter,
  viewedCarsRouter,
  newCarsRouter,
} from '@routes/routes';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import cors from 'cors';
import express from 'express';

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
  protectedRouter,
  userRouter,
  wishlistRouter,
  carsRouter,
  activateRouter,
  activateLinkRouter,
  updateUserRouter,
  newCarsRouter,
  viewedCarsRouter,
];
routes.forEach((route) => app.use(ENV.API.V1_PREFIX, route));

app.use(Sentry.Handlers.errorHandler());

// Handle arbitrary errors that are thrown from any controller above
app.use(errorsHandler);

app.listen(ENV.APP.SERVER_PORT, ENV.APP.SERVER_HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at ${ENV.APP.SERVER_PORT}`);
});
