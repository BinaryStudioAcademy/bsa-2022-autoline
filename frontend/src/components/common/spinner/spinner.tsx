import React, { FC } from 'react';

import { CircularProgress } from '@mui/material';

import styles from './styles.module.scss';

const Spinner: FC = () => {
  return (
    <div className={styles.spinnerContainer}>
      <CircularProgress />
    </div>
  );
};

export { Spinner };
