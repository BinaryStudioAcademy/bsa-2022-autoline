import logo from '@assets/images/logo-autoria.png';
import { WhereBuyItemProps } from '@common/types/where-to-buy/where-to-buy';
import { ButtonOutline } from '@components/common/button-outline/button-outline';

import styles from './styles.module.scss';

const WhereBuyItem: React.FC<WhereBuyItemProps> = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logoDiv}>
          <img className={styles.logo} src={logo} alt="logo" />
        </div>
        <div className={styles.description}>
          <span className={styles.carName}>bmw x5 m packet 40d 2015</span>
          <div className={styles.sellerLink}>
            <a>auto.ria.com</a>
          </div>
          <div className={styles.trigger}>
            <div>Auto.ria has been verified by insurance databases</div>
            <div>Auto.ria checked against 15 databases</div>
            <div>
              The seller has been working with Auto.ria for more than 5 years
            </div>
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.rectangle} />
          <div className={styles.price}>$ 47 500</div>
          <ButtonOutline className={styles.buyButton} text="Buy" />
        </div>
      </div>
    </>
  );
};

export { WhereBuyItem };
