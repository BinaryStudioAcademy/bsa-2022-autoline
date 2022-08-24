import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { StorageKey } from '@common/enums/app/storage-key.enum';
import { Grid, CircularProgress } from '@mui/material';

const RedirectAfterSign = (): React.ReactElement => {
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');

  useEffect(() => {
    if (accessToken && refreshToken) {
      localStorage.setItem(StorageKey.TOKEN, accessToken);
      localStorage.setItem(StorageKey.REFRESH, refreshToken);
    }
    window.close();
  }, []);
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <CircularProgress />
    </Grid>
  );
};

export { RedirectAfterSign };
