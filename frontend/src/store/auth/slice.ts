import { AppRoute, StorageKey } from '@common/enums/enums';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  user: null;
  token: string | null;
  refresh: string | null;
};

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem(StorageKey.TOKEN) || null,
  refresh: localStorage.getItem(StorageKey.REFRESH) || null,
};

const { reducer, actions } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.token = accessToken;
      if (refreshToken) state.refresh = refreshToken;
    },
    logOut: (state, action: PayloadAction<AppRoute>) => {
      if (action.payload) {
        state.token = null;
      }
    },
  },
  extraReducers: {},
});

export const { setCredentials, logOut } = actions;
export { reducer };
