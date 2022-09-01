import { configureStore } from '@reduxjs/toolkit';
import { authMiddleware } from '@store/auth/middlewares';
import { api } from '@store/queries';
import { combineReducers } from 'redux';

import { auth, carFilter, foundCars } from './root-reducer';

const rootReducer = combineReducers({
  auth,
  carFilter,
  foundCars,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(authMiddleware.middleware)
      .concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
