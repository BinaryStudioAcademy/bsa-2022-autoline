import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { StorageKey } from '@common/enums/enums';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { openOAuthPage } from '@helpers/helpers';
import { useAppDispatch } from '@hooks/hooks';
import { setCredentials } from '@store/root-reducer';

const SignWithOAuth = ({ title }: { title: string }): React.ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onStorageEvent = useCallback(
    (e: StorageEvent): void => {
      if (e.key === 'token') {
        const accessToken = localStorage.getItem(StorageKey.TOKEN);
        const refreshToken = localStorage.getItem(StorageKey.REFRESH);
        dispatch(setCredentials({ accessToken, refreshToken }));
        navigate('/', { replace: true });
      }
    },
    [title],
  );

  const onOAuthSign = (): void => {
    openOAuthPage(title);
  };

  useEffect(() => {
    window.addEventListener('storage', onStorageEvent, false);

    return (): void => {
      window.removeEventListener('storage', onStorageEvent, false);
    };
  }, [onStorageEvent]);

  return (
    <ButtonOutline text={'Continue with ' + title} onClick={onOAuthSign} />
  );
};

export { SignWithOAuth };
