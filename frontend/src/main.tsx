import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { ENV } from '@common/enums/app/env.enum';
import { Routing } from '@navigation/routing/routing';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

import { store } from './store/store';
import '@assets/css/styles.scss';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

Sentry.init({
  dsn: ENV.SENTRY.DSN,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routing />
    </Provider>
  </React.StrictMode>,
);
