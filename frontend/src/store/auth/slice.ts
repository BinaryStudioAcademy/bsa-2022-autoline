import { StorageKey } from '@common/enums/enums';
import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
  user: null;
  token: string | null;
};

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem(StorageKey.TOKEN) || null,
};

const { reducer, actions } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.token = null;
    },
  },
  extraReducers: {},
});

export const { setCredentials, logOut } = actions;
export { reducer };
