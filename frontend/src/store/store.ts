import { configureStore } from '@reduxjs/toolkit';
import { emailApi } from '@services/request-verification-link/email-link-service';
import { combineReducers } from 'redux';

import { auth } from './root-reducer';

const rootReducer = combineReducers({
  auth,
  [emailApi.reducerPath]: emailApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emailApi.middleware),
});
