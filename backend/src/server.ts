import { CONFIG } from '@configs/config';
import { errorsHandler } from '@middlewares/middlewares';
import { healthRouter, authRouter } from '@routes/routes';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import cors from 'cors';
import express from 'express';

// Express server configuration
const app = express();

if (CONFIG.SENTRY.ENABLE) {
  Sentry.init({
    environment: CONFIG.APP.NODE_ENV,
    dsn: CONFIG.SENTRY.DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],

    tracesSampleRate: 1.0,
  });
}

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app
  .use(
    cors({
      // Allow everything for dev env to test from the Postman or other API dev tools
      origin:
        CONFIG.APP.NODE_ENV === 'development' ? '*' : CONFIG.APP.FRONTEND_URL,
    }),
  )
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

const routes = [healthRouter, authRouter];
routes.forEach((route) => app.use(CONFIG.API.V1_PREFIX, route));

app.use(Sentry.Handlers.errorHandler());

// Handle arbitrary errors that are thrown from any controller above
app.use(errorsHandler);

app.listen(CONFIG.APP.PORT, CONFIG.APP.HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at ${CONFIG.APP.PORT}`);
});
