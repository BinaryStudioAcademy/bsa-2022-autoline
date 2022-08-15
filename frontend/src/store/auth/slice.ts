import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
  user: null;
};

const initialState: AuthState = {
  user: null,
};

const { reducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {},
});

export { reducer };
