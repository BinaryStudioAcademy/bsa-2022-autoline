import React from 'react';

import { ConnectOauth } from '@components/edit-profile/sign-in/oauth/connect-oauth';

import style from './styles.module.scss';

export const SignIn: React.FC<{ google: boolean; facebook: boolean }> = ({
  google,
  facebook,
}) => {
  return (
    <>
      <h2 className={style.title}>Sign In with</h2>
      <div className={style.btnWrapper}>
        <ConnectOauth title="Google" isConnected={google} />
        <ConnectOauth title="Facebook" isConnected={facebook} />
      </div>
    </>
  );
};
