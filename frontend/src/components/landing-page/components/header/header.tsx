import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '@assets/images/logo.svg';
import { AppRoute } from '@common/enums/app/app-route.enum';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { DrawerComp } from '../drawer/drawer';

export const Header = (): React.ReactElement => {
  const [value, setValue] = useState();
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  console.log(isMatch);

  return (
    <React.Fragment>
      <AppBar sx={{ background: '#ffffff' }}>
        <Toolbar>
          <Link to={AppRoute.ROOT}>
            <img
              // className={styles.logo}
              src={Logo}
              alt="Autoline"
            />
          </Link>{' '}
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: '2rem', paddingLeft: '10%' }}>
                Shoppee
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: 'auto' }}
                indicatorColor="secondary"
                // textColor="inherit"
                value={value}
                onChange={(e, value): void => setValue(value)}
              >
                <Tab label="Used Cars" style={{ textTransform: 'none' }} />
                <Tab label="New Cars" style={{ textTransform: 'none' }} />
                <Tab label="Sell Your Car" style={{ textTransform: 'none' }} />
                <Tab label="About us" style={{ textTransform: 'none' }} />
              </Tabs>
              <ButtonFill text="Create Account" />
              <ButtonOutline text="Sign In" />
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
