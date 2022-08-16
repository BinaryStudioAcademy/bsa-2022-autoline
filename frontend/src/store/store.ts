import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { Api } from './queries/index';
import { auth } from './root-reducer';

const rootReducer = combineReducers({
  auth,
  [Api.reducerPath]: Api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
});
