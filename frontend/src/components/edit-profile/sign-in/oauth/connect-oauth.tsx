import React, { useCallback, useEffect, useState } from 'react';

import { ButtonFill } from '@components/common/button-fill/button-fill';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { openOAuthPage } from '@helpers/sign/open-oauth';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { setCredentials } from '@store/auth/slice';

const ConnectOauth: React.FC<{ title: string }> = ({ title }) => {
  const [connected, setConnected] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  // const user = useAppSelector((state) => state.auth.user);

  const onStorageEvent = useCallback(
    (e: StorageEvent): void => {
      if (e.key === 'token') {
        const accessToken = localStorage.getItem('token');
        dispatch(setCredentials({ accessToken }));
        setConnected(true);
      }
    },
    [title],
  );

  const dispatch = useAppDispatch();

  const connectOauth = (): void => {
    openOAuthPage(title, token);
  };

  useEffect(() => {
    window.addEventListener('storage', onStorageEvent, false);

    return (): void => {
      window.removeEventListener('storage', onStorageEvent, false);
    };
  }, [onStorageEvent]);

  if (connected) {
    return <ButtonFill text={title + ' connected'} />;
  }
  return <ButtonOutline text={'Connect ' + title} onClick={connectOauth} />;
};

export { ConnectOauth };
