import { ENV } from '@common/enums/app/env.enum';

const openGooglePage = (token: string | null = null): void => {
  window.open(
    `${ENV.API_PATH}/auth/google/sign?token=${token}`,
    'Google OAuth',
    'height=615,width=605',
  );
};

export { openGooglePage };
