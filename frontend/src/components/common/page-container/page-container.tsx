import { ReactNode } from 'react';

import { Container } from '@mui/material';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

const PageContainer: React.FC<{ children: ReactNode; className: string }> = (
  props,
) => {
  const { children, className } = props;

  return (
    <Container
      className={clsx(styles.container, styles.pageContainer, className)}
    >
      {children}
    </Container>
  );
};

export { PageContainer };
