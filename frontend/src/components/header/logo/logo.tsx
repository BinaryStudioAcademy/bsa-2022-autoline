import React from 'react';

import LogoIcon from '@assets/images/logo.svg';

import styles from './logo.module.scss';

export const Logo: React.FC = () => {
  return (
    <div className={styles.logoContainer}>
      <img src={LogoIcon} alt="logo" />
    </div>
  );
};
