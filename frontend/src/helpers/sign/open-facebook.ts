import { ENV } from '@common/enums/app/env.enum';

const openFacebookAuthPage = (token: string | null = null): void => {
  window.open(
    `${ENV.API_PATH}/auth/facebook/sign?token=${token}`,
    'Facebook OAuth',
    'height=615,width=605',
  );
};

export { openFacebookAuthPage };
