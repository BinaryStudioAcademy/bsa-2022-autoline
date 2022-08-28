import React from 'react';

import { ButtonOutline } from '@components/common/button-outline/button-outline';

import style from './styles.module.scss';

export const SignIn: React.FC = () => {
  return (
    <>
      <h2 className={style.title}>Sign In with</h2>
      <div className={style.btnWrapper}>
        <ButtonOutline text="Sign Up with Google" />
        <ButtonOutline text="Sign Up with Facebook" />
      </div>
    </>
  );
};
