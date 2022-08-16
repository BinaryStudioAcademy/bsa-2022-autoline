import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { autolineApi } from './queries';
import { auth } from './root-reducer';

const rootReducer = combineReducers({
  auth,
  [autolineApi.reducerPath]: autolineApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(autolineApi.middleware),
});
