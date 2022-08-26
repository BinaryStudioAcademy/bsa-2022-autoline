import React from 'react';
import { Link } from 'react-router-dom';

import LogoIcon from '@assets/images/logo.svg';
import { AppRoute } from '@common/enums/enums';

import styles from './logo.module.scss';

export const Logo: React.FC = () => {
  return (
    <div className={styles.logoContainer}>
      <Link to={AppRoute.ROOT}>
        <img src={LogoIcon} alt="logo" />
      </Link>
    </div>
  );
};
