import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { auth } from './root-reducer';

const rootReducer = combineReducers({
  auth,
});

export const store = configureStore({
  reducer: rootReducer,
});
