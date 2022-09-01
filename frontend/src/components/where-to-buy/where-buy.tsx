import { ButtonOutline } from '@components/common/button-outline/button-outline';
import Divider from '@mui/material/Divider';

import styles from './styles.module.scss';
import { WhereBuyItem } from './where-buy/where-buy-component';

const WhereToBuy: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.carName}>bmw x5 m packet 40d 2015</div>
        <ButtonOutline className={styles.priceButton} text="By Price" />
      </div>
      <WhereBuyItem />
      <div className={styles.dividerDiv}>
        <Divider className={styles.divider} />
      </div>
      <WhereBuyItem />
      <div className={styles.dividerDiv}>
        <Divider className={styles.divider} />
      </div>
      <WhereBuyItem />
      <div className={styles.dividerDiv}>
        <Divider className={styles.divider} />
      </div>
      <WhereBuyItem />
      <div className={styles.dividerDiv}>
        <Divider className={styles.divider} />
      </div>
      <WhereBuyItem />
      <div className={styles.dividerDiv}>
        <Divider className={styles.divider} />
      </div>
      <div className={styles.seeAll}>
        <button className={styles.moreButton}>See All 10</button>
      </div>
    </div>
  );
};

export { WhereToBuy };
