import logo from '@assets/images/logo-autoria.png';
import { WhereBuyItemProps } from '@common/types/where-to-buy/where-to-buy';
import { ButtonOutline } from '@components/common/button-outline/button-outline';

import styles from './styles.module.scss';

const WhereBuyItem: React.FC<WhereBuyItemProps> = ({
  carName,
  url,
  price,
  description,
}) => {
  const handleBuy = (): void => {
    window.location.href = url;
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logoDiv}>
          <img className={styles.logo} src={logo} alt="logo" />
        </div>
        <div className={styles.description}>
          <span className={styles.carName}>{carName}</span>
          <div className={styles.sellerLink}>
            <a>{url}</a>
          </div>
          <div className={styles.trigger}>
            <div>{description}</div>
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.rectangle} />
          <div className={styles.price}>{`$ ${price}`}</div>
          <ButtonOutline
            className={styles.buyButton}
            text="Buy"
            onClick={handleBuy}
          />
        </div>
      </div>
    </>
  );
};

export { WhereBuyItem };
