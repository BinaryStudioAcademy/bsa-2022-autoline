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
import styles from './styles.module.scss';

export const Header = (): React.ReactElement => {
  const [value, setValue] = useState();
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  console.log(isMatch);

  return (
    <React.Fragment>
      <AppBar
        sx={{
          background: '#ffffff',
          boxShadow: 0,
        }}
      >
        <Toolbar sx={{ height: '70px' }}>
          <Link to={AppRoute.ROOT} style={{ marginLeft: '40px' }}>
            <img className={styles.logo} src={Logo} alt="Autoline" />
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
                sx={{ marginLeft: '40px' }}
                onChange={(e, value): void => setValue(value)}
                value={value}
              >
                <Tab
                  label="Used Cars"
                  className={styles.tab}
                  sx={{
                    color: 'black',
                    fontWeight: 600,
                    fontSize: '14px',
                    textTransform: 'none',
                  }}
                />
                <Tab
                  label="New Cars"
                  sx={{
                    color: 'black',
                    fontWeight: 600,
                    fontSize: '14px',
                    textTransform: 'none',
                  }}
                />
                <Tab
                  label="Sell Your Car"
                  sx={{
                    color: 'black',
                    fontWeight: 600,
                    fontSize: '14px',
                    textTransform: 'none',
                  }}
                />
                <Tab
                  label="About us"
                  sx={{
                    color: 'black',
                    fontWeight: 600,
                    fontSize: '14px',
                    textTransform: 'none',
                  }}
                />
              </Tabs>
              <ButtonFill className={styles.btnFill} text="Create Account" />
              <ButtonOutline className={styles.btnOutline} text="Sign In" />
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
