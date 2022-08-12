import { store } from '@store/store';

type RootState = ReturnType<typeof store.getState>;

export type { RootState };
