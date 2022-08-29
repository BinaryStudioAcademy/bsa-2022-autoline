import React, { useEffect, useState } from 'react';

import { PageContainer } from '@components/common/page-container/page-container';
import { useGetWishlistsQuery } from '@store/queries/preferences/wishlist';

import styles from './header.module.scss';
import { Logo } from './logo/logo';
import { Navigate } from './navigate/navigate';
import { PrivateElements } from './private-elements/private-elements';
import { PublicElements } from './public-elements/public-elements';

export const Header: React.FC = () => {
  const { data: wishlist = { models: [], complectations: [] } } =
    useGetWishlistsQuery();
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    setWishlistCount(wishlist.models.length + wishlist.complectations.length);
  }, [wishlist]);

  const user = {
    favorites: wishlistCount,
    comparisons: 5,
    notifications: 7,
    avatar: undefined,
  };

  return (
    <div className={styles.header}>
      <PageContainer>
        <div className={styles.headerInner}>
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
      </PageContainer>
    </div>
  );
};
