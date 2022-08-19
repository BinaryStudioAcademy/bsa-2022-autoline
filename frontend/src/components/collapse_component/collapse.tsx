import { ReactNode, useState } from 'react';

import styles from './styles.module.scss';

interface CollapseProps {
  label: string;
  children?: ReactNode;
}

const Collapse: React.FC<CollapseProps> = ({ children, label }) => {
  const [selected, setSelected] = useState<boolean>(false);

  const toggle = (): void => {
    setSelected(!selected);
  };

  return (
    <div>
      <div className={styles.title} onClick={toggle}>
        <p className={styles.char}>{selected ? '–' : '+'}</p>
        <p className={styles.lable}>{label}</p>
      </div>
      <div
        className={
          selected ? `${styles.content} ${styles.show}` : `${styles.content}`
        }
      >
        {children}
      </div>
    </div>
  );
};

export { Collapse };
