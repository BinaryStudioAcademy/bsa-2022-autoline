import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '@assets/images/logo.svg';
import { AppRoute } from '@common/enums/app/app-route.enum';
import { PageContainer } from '@components/common/page-container/page-container';
import { EditProfile } from '@components/edit-profile/edit-profile';
import { UnauthorisedElements } from '@components/header/unauthorised-elements/unauthorised-elements';
import { useAppDispatch } from '@hooks/hooks';
import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { logOut } from '@store/auth/slice';
import { useGetActiveComparisonStatusQuery } from '@store/queries/comparisons';
import { useGetHistoryOfViwedCarsQuery } from '@store/queries/history-viewed-cars';
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
  const { data: comparisons } = useGetActiveComparisonStatusQuery();
  const { data: viewed } = useGetHistoryOfViwedCarsQuery({});
  const [wishlistCount, setWishlistCount] = useState(0);
  const [comparisonCount, setComparisonCount] = useState(0);
  const [viewedCount, setViewedCount] = useState(0);
  const [openSettings, setOpenSettings] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    setWishlistCount(wishlist.models.length + wishlist.complectations.length);
  }, [wishlist]);

  useEffect(() => {
    if (comparisons) setComparisonCount(comparisons.length);
  }, [comparisons]);

  useEffect(() => {
    if (viewed) setViewedCount(viewed.count);
  }, [viewed]);

  const { data: authData } = useGetUserQuery();

  const reminders = {
    favorites: {
      label: 'Favorites',
      linkTo: AppRoute.PERSONAL,
      count: wishlistCount,
    },
    viewed: {
      label: 'Viewed',
      linkTo: AppRoute.PERSONAL,
      count: viewedCount,
    },
    comparisons: {
      label: 'Comparisons',
      linkTo: '#',
      count: comparisonCount,
    },
  };

  const commonMenu = {
    search: {
      label: 'Search',
      onClick: () => navigate(AppRoute.SEARCH),
    },
    aboutUs: {
      label: 'About Us',
      onClick: () => navigate(AppRoute.ABOUT),
    },
  };

  const userMenu = {
    account: {
      label: 'Account',
      onClick: () => navigate(AppRoute.PERSONAL),
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
        className={styles.header}
      >
        <PageContainer>
          <Toolbar className={styles.toolbar}>
            <Link to={AppRoute.ROOT}>
              <img className={styles.logo} src={Logo} alt="Autoline" />
            </Link>
            {isMatchSm ? (
              <DrawerComponent
                userMenu={authData ? userMenu : undefined}
                reminders={authData ? reminders : undefined}
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
                {authData ? (
                  <PrivateElements
                    avatar={authData.photoUrl}
                    role={authData.role}
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
        </PageContainer>
      </AppBar>
    </>
  );
};
