/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportHeight: 1050,
  viewportWidth: 1680,
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
