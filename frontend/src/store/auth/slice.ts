import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
  user: null;
  token: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
};

const { reducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {},
});

export { reducer };
