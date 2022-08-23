import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { api } from './queries/index';
import { auth } from './root-reducer';

const rootReducer = combineReducers({
  auth,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
