import { ENV } from '@common/enums/app/env.enum';
import { healthRouter } from '@routes/health/health.router';
import cors from 'cors';
import express from 'express';

// Express server configuration
const app = express();
app
  .use(
    cors({
      // Allow everything for dev env to test from the Postman or other API dev tools
      origin: ENV.APP.NODE_ENV === 'development' ? '*' : ENV.APP.FRONTEND_URL,
    }),
  )
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

const routes = [healthRouter];
routes.forEach((route) => app.use('/', route));

app.listen(ENV.APP.SERVER_PORT, ENV.APP.SERVER_HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at ${ENV.APP.SERVER_PORT}`);
});
