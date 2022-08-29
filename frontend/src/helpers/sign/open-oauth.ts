import { ENV } from '@common/enums/app/env.enum';

const openOAuthPage = (authType: string, token: string | null = null): void => {
  window.open(
    `${ENV.API_PATH}/auth/${authType}/sign?token=${token}`,
    `${authType} OAuth`,
    'height=615,width=605',
  );
};

export { openOAuthPage };
