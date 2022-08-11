import { createSlice } from '@reduxjs/toolkit';

type State = {
  user: null;
};

const initialState: State = {
  user: null,
};

const { reducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export { reducer };
