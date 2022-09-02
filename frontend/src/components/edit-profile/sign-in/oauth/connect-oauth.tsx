import React, { useCallback, useEffect } from 'react';

import { StorageKey } from '@common/enums/enums';
import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { openOAuthPage } from '@helpers/sign/open-oauth';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { setCredentials } from '@store/auth/slice';
import {
  useGetUserQuery,
  useDeleteOauthMutation,
} from '@store/queries/user/update-user';

const ConnectOauth: React.FC<{ title: string; isConnected: boolean }> = ({
  title,
  isConnected,
}) => {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const { refetch } = useGetUserQuery();
  const [deleteOauth] = useDeleteOauthMutation();

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

  const connectOauth = (e: React.MouseEvent): void => {
    e.preventDefault();
    openOAuthPage(title, token);
  };

  const disconnectOauth = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    await deleteOauth({ provider: title });
  };

  useEffect(() => {
    window.addEventListener('storage', onStorageEvent, false);

    return (): void => {
      window.removeEventListener('storage', onStorageEvent, false);
    };
  }, [onStorageEvent]);

  if (isConnected) {
    return (
      <ButtonFill text={title + ' is connected'} onClick={disconnectOauth} />
    );
  }
  return <ButtonOutline text={'Connect ' + title} onClick={connectOauth} />;
};

export { ConnectOauth };
