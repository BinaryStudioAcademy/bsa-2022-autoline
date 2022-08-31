import { AppRoute } from '@common/enums/enums';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { logOut } from '@store/root-reducer';

const authMiddleware = createListenerMiddleware();

authMiddleware.startListening({
  actionCreator: logOut,
  effect: () => {
    localStorage.clear();
    window.location.replace(AppRoute.SIGN_IN);
  },
});

export { authMiddleware };
