import React from 'react';
import { Link } from 'react-router-dom';

import UserIcon from '@assets/images/header/default-avatar.png';
import { AppRoute } from '@common/enums/app/app-route.enum';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import styles from '@components/header/styles.module.scss';
import { useMediaQuery, useTheme } from '@mui/material';

const DefaultElements: React.FC = () => {
  const theme = useTheme();
  const isMatchMd = useMediaQuery(theme.breakpoints.up('md'));

  return isMatchMd ? (
    <>
      <Link to={AppRoute.SIGN_UP} className={styles.signupBtn}>
        <ButtonFill className={styles.btnFill} text="Create Account" />
      </Link>
      <Link to={AppRoute.SIGN_IN}>
        <ButtonOutline className={styles.btnOutline} text="Sign In" />
      </Link>
    </>
  ) : (
    <Link to={AppRoute.SIGN_IN} className={styles.signupBtn}>
      <img src={UserIcon} className={styles.authAvatar} />
    </Link>
  );
};

export { DefaultElements };
