import React, { useCallback, useEffect } from 'react';

import { StorageKey } from '@common/enums/enums';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { openOAuthPage } from '@helpers/sign/open-oauth';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { setCredentials } from '@store/auth/slice';
import { useGetUserQuery } from '@store/queries/user/update-user';

const ConnectOauth: React.FC<{ title: string; isConnected: boolean }> = ({
  title,
  isConnected,
}) => {
  const token = useAppSelector((state) => state.auth.token);
  const { refetch } = useGetUserQuery();

  const onStorageEvent = useCallback(
    (e: StorageEvent): void => {
      if (e.key === 'token') {
        const accessToken = localStorage.getItem(StorageKey.TOKEN);
        const refreshToken = localStorage.getItem(StorageKey.REFRESH);
        dispatch(setCredentials({ accessToken, refreshToken }));
        refetch();
      }
    },
    [title],
  );

  const dispatch = useAppDispatch();

  const connectOauth = (e: React.MouseEvent): void => {
    e.preventDefault();
    openOAuthPage(title, token);
  };

  useEffect(() => {
    window.addEventListener('storage', onStorageEvent, false);

    return (): void => {
      window.removeEventListener('storage', onStorageEvent, false);
    };
  }, [onStorageEvent]);

  if (isConnected) {
    return (
      <ButtonFill
        text={title + ' is connected'}
        onClick={(e: React.MouseEvent): void => {
          e.preventDefault();
        }}
      />
    );
  }
  return <ButtonOutline text={'Connect ' + title} onClick={connectOauth} />;
};

export { ConnectOauth };
