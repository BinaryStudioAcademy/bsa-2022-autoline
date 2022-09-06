import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '@assets/images/logo.svg';
import { AppRoute } from '@common/enums/app/app-route.enum';
import { EditProfile } from '@components/edit-profile/edit-profile';
import { UnauthorisedElements } from '@components/header/unauthorised-elements/unauthorised-elements';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { logOut } from '@store/auth/slice';
import { useGetWishlistsQuery } from '@store/queries/preferences/wishlist';
import { useGetUserQuery } from '@store/queries/user/update-user';

import { DrawerComponent } from './drawer/drawer';
import { PrivateElements } from './private-elements/private-elements';
import styles from './styles.module.scss';

export const Header = (): React.ReactElement => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMatchSm = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: wishlist = { models: [], complectations: [] } } =
    useGetWishlistsQuery();
  const [wishlistCount, setWishlistCount] = useState(0);
  const [openSettings, setOpenSettings] = useState(false);
  const userToken = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    setWishlistCount(wishlist.models.length + wishlist.complectations.length);
  }, [wishlist]);

  const { data: user } = useGetUserQuery();

  const reminders = {
    favorites: {
      label: 'Favorites',
      linkTo: AppRoute.PERSONAL,
      count: wishlistCount,
    },
    notifications: {
      label: 'Notifications',
      linkTo: '#',
      count: 7,
    },
    comparisons: {
      label: 'Comparisons',
      linkTo: '#',
      count: 5,
    },
  };

  const commonMenu = {
    search: {
      label: 'Search',
      onClick: () => navigate(AppRoute.SEARCH),
    },
    aboutUs: {
      label: 'About Us',
      onClick: () => navigate('#'),
    },
  };

  const userMenu = {
    account: {
      label: 'Account',
      onClick: () => navigate('#'),
    },
    administration: {
      label: 'Administration',
      onClick: (): void => navigate(AppRoute.ADMINISTRATION),
    },
    settings: {
      label: 'Settings',
      onClick: (): void => setOpenSettings(true),
    },
    logout: {
      label: 'Logout',
      onClick: () => dispatch(logOut(AppRoute.ROOT)),
    },
  };

  return (
    <>
      <AppBar
        id="mainHeader"
        sx={{
          background: '#ffffff',
          boxShadow: 0,
          position: 'static',
        }}
      >
        <Toolbar>
          <Link to={AppRoute.ROOT}>
            <img className={styles.logo} src={Logo} alt="Autoline" />
          </Link>
          {isMatchSm ? (
            <DrawerComponent
              userMenu={userToken ? userMenu : undefined}
              reminders={userToken ? reminders : undefined}
              commonMenu={commonMenu}
            />
          ) : (
            <>
              <Tabs
                onChange={(e, value): void => setValue(value)}
                value={value}
                className={styles.navigation}
              >
                <Tab
                  label={commonMenu.search.label}
                  className={styles.navLink}
                  onClick={commonMenu.search.onClick}
                />
                <Tab
                  label={commonMenu.aboutUs.label}
                  className={styles.navLink}
                  onClick={commonMenu.aboutUs.onClick}
                />
              </Tabs>
              {userToken && user ? (
                <PrivateElements
                  avatar={user.photoUrl}
                  role={user.role}
                  reminders={reminders}
                  setOpenSettings={setOpenSettings}
                  userMenu={userMenu}
                />
              ) : (
                <UnauthorisedElements />
              )}
            </>
          )}
          {openSettings && (
            <EditProfile onClose={(): void => setOpenSettings(false)} />
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
