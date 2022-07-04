import React from 'react';
import { createRoot } from 'react-dom/client';

import { Routing } from '@navigation/routing/routing';
import '@assets/css/styles.scss';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
);
