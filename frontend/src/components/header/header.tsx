import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import Logo from '@assets/images/logo.svg';
import { AppRoute } from '@common/enums/app/app-route.enum';
import { PageContainer } from '@components/common/page-container/page-container';
import { EditProfile } from '@components/edit-profile/edit-profile';
import { UnauthorisedElements } from '@components/header/unauthorised-elements/unauthorised-elements';
import { useAppDispatch } from '@hooks/hooks';
import { AppBar, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { logOut } from '@store/auth/slice';
import { useGetActiveComparisonStatusQuery } from '@store/queries/comparisons';
import { useGetHistoryOfViwedCarsQuery } from '@store/queries/history-viewed-cars';
import { useGetWishlistEntriesQuery } from '@store/queries/preferences/wishlist';
import { useGetUserQuery } from '@store/queries/user/update-user';
import { clsx } from 'clsx';

import { DrawerComponent } from './drawer/drawer';
import { PrivateElements } from './private-elements/private-elements';
import styles from './styles.module.scss';

export const Header = (): React.ReactElement => {
  const theme = useTheme();
  const isMatchSm = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: wishlist } = useGetWishlistEntriesQuery();
  const { data: comparisons } = useGetActiveComparisonStatusQuery();
  const { data: viewed } = useGetHistoryOfViwedCarsQuery({});
  const [wishlistCount, setWishlistCount] = useState(0);
  const [comparisonCount, setComparisonCount] = useState(0);
  const [viewedCount, setViewedCount] = useState(0);
  const [openSettings, setOpenSettings] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (wishlist) setWishlistCount(wishlist.length);
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
      linkTo: AppRoute.COMPARISONS,
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
                <NavLink
                  to={AppRoute.SEARCH}
                  className={({ isActive }): string => {
                    return clsx(styles.navLink, {
                      [styles.itemActive]: isActive,
                    });
                  }}
                >
                  {commonMenu.search.label}
                </NavLink>
                <NavLink
                  to={AppRoute.ABOUT}
                  className={({ isActive }): string => {
                    return clsx(styles.navLink, {
                      [styles.itemActive]: isActive,
                    });
                  }}
                >
                  {commonMenu.aboutUs.label}
                </NavLink>
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
