import React from 'react';

import styles from './public-elements.module.scss';

export const PublicElements: React.FC = () => {
  return (
    <div className={styles.btnList}>
      <button className={styles.btnPrimary}>Create Account</button>
      <button className={styles.btnSecondary}>Sign In</button>
    </div>
  );
};
