import React from 'react';

import { useGetWishlistsQuery } from '@store/queries/preferences/wishlist';

import styles from './header.module.scss';
import { Logo } from './logo/logo';
import { Navigate } from './navigate/navigate';
import { PrivateElements } from './private-elements/private-elements';
import { PublicElements } from './public-elements/public-elements';

export const Header: React.FC = () => {
  const { data: wishlist = 0 } = useGetWishlistsQuery();

  const user = {
    favorites: wishlist && wishlist.count,
    comparisons: 5,
    notifications: 7,
    avatar: undefined,
  };

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <Navigate />
      </div>
      {user ? (
        <PrivateElements
          avatar={user.avatar}
          notifications={user.notifications}
          comparisons={user.comparisons}
          favorites={user.favorites}
        />
      ) : (
        <PublicElements />
      )}
    </div>
  );
};
