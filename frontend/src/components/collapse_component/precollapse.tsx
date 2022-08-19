import { ReactNode } from 'react';

import { Collapse } from './collapse';
import styles from './styles.module.scss';

interface OneComponentInterface {
  lable: string;
  component: ReactNode;
}

interface CollapseInterface {
  components: OneComponentInterface[];
}

const PreCollapse: React.FC<CollapseInterface> = ({ components }) => {
  return (
    <div className={styles.wrapper}>
      {components.map((el) => {
        return <Collapse label={el.lable}>{el.component}</Collapse>;
      })}
    </div>
  );
};
export { PreCollapse };
