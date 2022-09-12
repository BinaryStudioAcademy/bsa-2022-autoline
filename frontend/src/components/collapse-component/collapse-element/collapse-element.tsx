import { ReactNode, useState } from 'react';

import { clsx } from 'clsx';

import styles from './styles.module.scss';

interface CollapseProps {
  label: string;
  children?: ReactNode;
  isOpen?: boolean;
}

const CollapseElement: React.FC<CollapseProps> = ({
  children,
  label,
  isOpen = false,
}) => {
  const [selected, setSelected] = useState<boolean>(isOpen);

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
