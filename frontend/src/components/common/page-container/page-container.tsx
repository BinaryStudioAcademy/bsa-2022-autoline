import { ReactFragment } from 'react';

import { Container } from '@mui/material';

import styles from './styles.module.scss';

export const PageContainer = (props: {
  children: ReactFragment;
}): React.ReactElement => {
  return <Container className={styles.container}>{props.children}</Container>;
};
