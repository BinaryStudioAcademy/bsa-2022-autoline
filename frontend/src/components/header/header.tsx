import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '@assets/images/logo.svg';
import { AppRoute } from '@common/enums/app/app-route.enum';
import { DefaultElements } from '@components/header/default-elements/default-elements';
import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useGetWishlistsQuery } from '@store/queries/preferences/wishlist';
import { useGetUserQuery } from '@store/queries/user/update-user';
import { store } from '@store/store';

import { DrawerComponent } from '../landing-page/components/drawer/drawer';
import { PrivateElements } from './private-elements/private-elements';
import styles from './styles.module.scss';

export const Header = (): React.ReactElement => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMatchSm = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: wishlist = { models: [], complectations: [] } } =
    useGetWishlistsQuery();
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    setWishlistCount(wishlist.models.length + wishlist.complectations.length);
  }, [wishlist]);

  const { data } = useGetUserQuery();

  const user = {
    favorites: wishlistCount,
    comparisons: 5,
    notifications: 7,
    ...data,
  };

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
            <DrawerComponent />
          ) : (
            <>
              <Tabs
                onChange={(e, value): void => setValue(value)}
                value={value}
                className={styles.nav}
              >
                <Tab label="Used Cars" className={styles.navLink} />
                <Tab label="New Cars" className={styles.navLink} />
                <Tab label="About us" className={styles.navLink} />
              </Tabs>
              {store.getState().auth.token ? (
                <PrivateElements
                  avatar={user.photoUrl}
                  notifications={user.notifications}
                  comparisons={user.comparisons}
                  favorites={user.favorites}
                />
              ) : (
                <DefaultElements />
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
