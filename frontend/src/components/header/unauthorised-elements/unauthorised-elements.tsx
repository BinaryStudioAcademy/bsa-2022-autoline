import React from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '@common/enums/app/app-route.enum';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import styles from '@components/header/styles.module.scss';
import { useMediaQuery, useTheme } from '@mui/material';
import { clsx } from 'clsx';

const UnauthorisedElements: React.FC = () => {
  const theme = useTheme();
  const isMatchMd = useMediaQuery(theme.breakpoints.up('md'));

  return isMatchMd ? (
    <>
      <Link to={AppRoute.SIGN_UP} className={styles.signupBtn}>
        <ButtonFill
          className={clsx(styles.button, styles.btnFill)}
          text="Create Account"
        />
      </Link>
      <Link to={AppRoute.SIGN_IN}>
        <ButtonOutline
          className={clsx(styles.button, styles.btnOutline)}
          text="Sign In"
        />
      </Link>
    </>
  ) : (
    <Link to={AppRoute.SIGN_UP} className={styles.signupBtn}>
      <ButtonOutline
        className={clsx(styles.button, styles.btnOutline)}
        text="Sign In"
      />
    </Link>
  );
};

export { UnauthorisedElements };
