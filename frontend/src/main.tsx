import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { ENV } from '@common/enums/app/env.enum';
import { CompareContextProvider } from '@contexts/compare-context';
import { WishlistContextProvider } from '@contexts/wishlist-context';
import { Routing } from '@navigation/routing/routing';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { store } from '@store/store';
import 'react-toastify/dist/ReactToastify.css';

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
      <WishlistContextProvider>
        <CompareContextProvider>
          <Routing />
          <ToastContainer position="bottom-right" autoClose={5000} />
        </CompareContextProvider>
      </WishlistContextProvider>
    </Provider>
  </React.StrictMode>,
);
