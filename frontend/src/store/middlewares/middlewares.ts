import { AppRoute } from '@common/enums/enums';
import { RootState } from '@common/types/types';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { like } from '@store/queries/preferences/wishlist';
import { AppDispatch } from '@store/store';

import type { TypedStartListening } from '@reduxjs/toolkit';

const checkTokenMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const startAppListening =
  checkTokenMiddleware.startListening as AppStartListening;

startAppListening({
  matcher: like,
  effect: (action, listenerApi) => {
    const token = listenerApi.getState().auth.token;
    if (!token) {
      window.location.replace(AppRoute.SIGN_IN);
      return;
    }
  },
});

export { checkTokenMiddleware };
