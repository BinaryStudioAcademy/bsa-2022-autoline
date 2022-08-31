import React from 'react';

import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { openOAuthPage } from '@helpers/sign/open-oauth';
import { useAppSelector } from '@hooks/hooks';

const ConnectOauth: React.FC<{ title: string }> = ({ title }) => {
  const token = useAppSelector((state) => state.auth.token);
  // const user = useAppSelector((state) => state.auth.user);
  // const dispatch = useAppDispatch();

  const connectOauth = (): void => {
    openOAuthPage(title, token);
  };

  return <ButtonOutline text={'Connect' + title} onClick={connectOauth} />;
};

export { ConnectOauth };
