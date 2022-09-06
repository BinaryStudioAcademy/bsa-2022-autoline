import { createListenerMiddleware } from '@reduxjs/toolkit';
import { logOut } from '@store/root-reducer';

const authMiddleware = createListenerMiddleware();

authMiddleware.startListening({
  actionCreator: logOut,
  effect: (action) => {
    localStorage.clear();
    window.location.replace(action.payload);
  },
});

export { authMiddleware };
