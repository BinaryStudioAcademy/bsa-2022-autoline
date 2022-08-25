import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { openFacebookAuthPage } from '@helpers/helpers';
import { useAppDispatch } from '@hooks/hooks';
import { setCredentials } from '@store/root-reducer';

const SignWithFacebook = ({ title }: { title: string }): React.ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onStorageEvent = useCallback((e: StorageEvent): void => {
    if (e.key === 'token') {
      const accessToken = localStorage.getItem('token');
      dispatch(setCredentials({ accessToken }));
      navigate('/', { replace: true });
    }
  }, []);

  const onFacebookSign = (): void => {
    openFacebookAuthPage();
  };

  useEffect(() => {
    window.addEventListener('storage', onStorageEvent, false);

    return (): void => {
      window.removeEventListener('storage', onStorageEvent, false);
    };
  }, [onStorageEvent]);

  return (
    <ButtonOutline text={title + ' with Facebook'} onClick={onFacebookSign} />
  );
};

export { SignWithFacebook };
