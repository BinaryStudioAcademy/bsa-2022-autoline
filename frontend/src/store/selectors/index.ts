import { RootState } from '@common/types/types';

export const selectAuthToken = (state: RootState): string | null =>
  state.auth.token;
