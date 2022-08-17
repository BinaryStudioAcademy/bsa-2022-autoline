import { ReactFragment } from 'react';

import { Container } from '@mui/material';
import clsx from 'clsx';

import styles from './styles.module.scss';

export const PageContainer = (props: {
  children: ReactFragment;
}): React.ReactElement => {
  return (
    <Container className={clsx(styles.container, styles.containerLarge)}>
      {props.children}
    </Container>
  );
};
