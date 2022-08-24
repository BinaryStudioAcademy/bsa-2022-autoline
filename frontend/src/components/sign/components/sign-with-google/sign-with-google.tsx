import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { openGooglePage } from '@helpers/helpers';
import { useAppDispatch } from '@hooks/hooks';
import { setCredentials } from '@store/root-reducer';

const SignWithGoogle = ({ title }: { title: string }): React.ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onStorageEvent = (): void => {
    const accessToken = localStorage.getItem('token');
    dispatch(setCredentials({ accessToken }));
    navigate('/', { replace: true });
  };

  const onGoogleSign = (): void => {
    openGooglePage();
    window.addEventListener('storage', onStorageEvent, false);
  };

  return <ButtonOutline text={title + ' with Google'} onClick={onGoogleSign} />;
};

export { SignWithGoogle };
