import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import UserIcon from '@assets/images/header/default-avatar.png';
import Logo from '@assets/images/logo.svg';
import { AppRoute } from '@common/enums/app/app-route.enum';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { DrawerComp } from '../drawer/drawer';
import styles from './styles.module.scss';

export const Header = (): React.ReactElement => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMatchSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMatchMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <AppBar
        sx={{
          background: '#ffffff',
          boxShadow: 0,
        }}
      >
        <Toolbar>
          <Link to={AppRoute.ROOT}>
            <img className={styles.logo} src={Logo} alt="Autoline" />
          </Link>
          {isMatchSm ? (
            <DrawerComp />
          ) : (
            <>
              <Tabs
                onChange={(e, value): void => setValue(value)}
                value={value}
              >
                {/* <Tab sx={{ display: 'none' }} /> */}
                <Tab label="Used Cars" />
                <Tab label="New Cars" />
                <Tab label="About us" />
              </Tabs>
              {isMatchMd ? (
                <>
                  <Link to={AppRoute.SIGN_UP} className={styles.signupBtn}>
                    <ButtonFill
                      className={styles.btnFill}
                      text="Create Account"
                    />
                  </Link>
                  <Link to={AppRoute.SIGN_IN}>
                    <ButtonOutline
                      className={styles.btnOutline}
                      text="Sign In"
                    />
                  </Link>
                </>
              ) : (
                <Link to={AppRoute.SIGN_IN} className={styles.signupBtn}>
                  <img src={UserIcon} className={styles.authAvatar} />
                </Link>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
