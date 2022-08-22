import { ReactNode, useState } from 'react';

import { clsx } from 'clsx';

import styles from './styles.module.scss';

interface CollapseProps {
  label: string;
  children?: ReactNode;
}

const CollapseElement: React.FC<CollapseProps> = ({ children, label }) => {
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
      <div className={clsx(styles.content, { [styles.show]: selected })}>
        {children}
      </div>
    </div>
  );
};

export { CollapseElement };
