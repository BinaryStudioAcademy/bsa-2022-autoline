import { ENV } from '@common/enums/app/env.enum';
import { configureStore } from '@reduxjs/toolkit';
import { authMiddleware } from '@store/auth/middlewares';
import { api } from '@store/queries';
import { combineReducers } from 'redux';

import { checkTokenMiddleware } from './queries/preferences/middlewares';
import {
  auth,
  carFilter,
  carModels,
  foundCars,
  whereBuy,
} from './root-reducer';

const rootReducer = combineReducers({
  auth,
  carFilter,
  carModels,
  foundCars,
  whereBuy,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: ENV.DEV,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(authMiddleware.middleware, checkTokenMiddleware.middleware)
      .concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
