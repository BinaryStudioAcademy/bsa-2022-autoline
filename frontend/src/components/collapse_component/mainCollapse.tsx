import { ReactNode } from 'react';

import { NewCarCard } from '../new-car-card/new-car-card';
import { PreCollapse } from './precollapse';
import styles from './styles.module.scss';

interface OneComponentInterface {
  lable: string;
  component: ReactNode;
}

const elements: OneComponentInterface[] = [
  { lable: 'COMPLITE SET', component: NewCarCard({}) },
  { lable: 'CHARACTERISTICS', component: NewCarCard({}) },
  { lable: 'WHERE TO BUY', component: NewCarCard({}) },
];

const MainCollapse: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <PreCollapse components={elements} />
    </div>
  );
};
export { MainCollapse };
