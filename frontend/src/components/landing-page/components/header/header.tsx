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

import './styles.scss';

export const Header = (): React.ReactElement => {
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatchSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMatchMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <React.Fragment>
      <AppBar
        sx={{
          background: '#ffffff',
          boxShadow: 0,
        }}
      >
        <Toolbar>
          <Link to={AppRoute.ROOT}>
            <img className="logo" src={Logo} alt="Autoline" />
          </Link>
          {isMatchSm ? (
            <DrawerComp />
          ) : (
            <>
              <Tabs
                onChange={(e, value): void => setValue(value)}
                value={value}
              >
                <Tab label="Used Cars" />
                <Tab label="New Cars" />
                <Tab label="About us" />
              </Tabs>
              {isMatchMd ? (
                <>
                  <Link to={AppRoute.SIGN_UP} className="signupBtn">
                    <ButtonFill className="btnFill" text="Create Account" />
                  </Link>
                  <Link to={AppRoute.SIGN_IN}>
                    <ButtonOutline className="btnOutline" text="Sign In" />
                  </Link>
                </>
              ) : (
                <Link to={AppRoute.SIGN_IN} className="signupBtn">
                  <img src={UserIcon} className="auth-avatar" />
                </Link>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
