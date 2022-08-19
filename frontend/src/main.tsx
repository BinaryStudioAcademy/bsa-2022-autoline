import React from 'react';
import { createRoot } from 'react-dom/client';

import { Routing } from '@navigation/routing/routing';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

import { CONFIG } from './configs/config';
import '@assets/css/styles.scss';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

if (CONFIG.APP.SENTRY.ENABLE) {
  Sentry.init({
    dsn: CONFIG.APP.SENTRY.DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
);
