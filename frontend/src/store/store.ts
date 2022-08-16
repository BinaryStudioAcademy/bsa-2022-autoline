import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { authApi } from './queries/auth';
import { auth } from './root-reducer';

const rootReducer = combineReducers({
  auth,
  [authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
