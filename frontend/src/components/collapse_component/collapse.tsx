import { ReactNode, useState } from 'react';

import styles from './styles.module.scss';

const data = [
  {
    title: 'complite set',
    body: 'more text jdkf kdfjkd ksdjfk ksdfj more textd more text jdkf kdfjkd ksdjfk ksdfj more textd more text jdkf kdfjkd ksdjfk ksdfj more textd more text jdkf kdfjkd ksdjfk ksdfj more textd more text jdkf kdfjkd ksdjfk ksdfj more textd',
  },
  {
    title: 'characteristics',
    body: 'more text jdkf kdfjkd ksdjfk ksdfj more textd more text jdkf kdfjkd ksdjfk ksdfj more textd more text jdkf kdfjkd ksdjfk ksdfj more textd more text jdkf kdfjkd ksdjfk ksdfj more textd more text jdkf kdfjkd ksdjfk ksdfj more textd',
  },
  {
    title: 'Where to by',
    body: 'more text jdkf kdfjkd ksdjfk ksdfj more textd more text jdkf kdfjkd ksdjfk ksdfj more textd more text jdkf kdfjkd ksdjfk ksdfj more textd more text jdkf kdfjkd ksdjfk ksdfj more textd more text jdkf kdfjkd ksdjfk ksdfj more textd',
  },
];

interface CollapseProps {
  // elem: React.ReactElement;
  children?: ReactNode;
}

const Collapse: React.FC<CollapseProps> = ({ children }) => {
  // const reactEl = elem();
  const [selected, setSelected] = useState<number | null>(null);

  const toggle = (i: number): void => {
    if (selected == i) {
      setSelected(null);
      return;
    }
    setSelected(i);
  };

  return (
    <div className={styles.wrapper}>
      {children}
      <div className={styles.accordion}>
        {data.map((item, i) => (
          <div className={styles.item}>
            <div className={styles.title} onClick={(): void => toggle(i)}>
              <p className={styles.char}>{selected == i ? '-' : '+'}</p>
              <h2 className={styles.lable}>{item.title}</h2>
            </div>
            <div
              className={
                selected == i
                  ? `${styles.content} ${styles.show}`
                  : `${styles.content}`
              }
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Collapse };
