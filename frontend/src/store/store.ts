import { configureStore } from '@reduxjs/toolkit';
import { api } from '@store/queries';
import { combineReducers } from 'redux';

import { auth, carFilter } from './root-reducer';

const rootReducer = combineReducers({
  auth,
  carFilter,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
