import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '@assets/images/logo.svg';
import { AppRoute } from '@common/enums/app/app-route.enum';
import { EditProfile } from '@components/edit-profile/edit-profile';
import { UnauthorisedElements } from '@components/header/unauthorised-elements/unauthorised-elements';
import { useAppSelector } from '@hooks/hooks';
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

  const userMenu = [
    {
      label: 'Account',
    },
    {
      label: 'Setting',
      onClick: (): void => {
        setOpenSettings(true);
      },
    },
    {
      label: 'Logout',
    },
  ];

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
            <DrawerComponent
              userMenu={userToken ? userMenu : undefined}
              reminders={userToken ? reminders : undefined}
            />
          ) : (
            <>
              <Tabs
                onChange={(e, value): void => setValue(value)}
                value={value}
                className={styles.navigation}
              >
                <Tab label="Used Cars" className={styles.navLink} />
                <Tab label="New Cars" className={styles.navLink} />
                <Tab label="About us" className={styles.navLink} />
              </Tabs>
              {userToken && user ? (
                <PrivateElements
                  avatar={user.photoUrl}
                  reminders={reminders}
                  setOpenSettings={setOpenSettings}
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
