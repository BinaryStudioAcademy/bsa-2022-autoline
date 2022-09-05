import logo from '@assets/images/logo-autoria.png';
import { WhereBuyInterface } from '@common/types/where-to-buy/where-to-buy';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import Divider from '@mui/material/Divider';

import styles from './styles.module.scss';

interface WhereBuyItemProps {
  poster: WhereBuyInterface;
}

const WhereBuyItem: React.FC<WhereBuyItemProps> = (props) => {
  const {
    USD: price,
    autoData: { description, year },
    linkToView,
    markName,
    modelName,
  } = props.poster;
  const name = `${markName} ${modelName} ${year}`;
  const url = `https://auto.ria.com/uk${linkToView}`;

  const handleBuy = (): void => {
    window.open(url, '_blank');
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logoDiv}>
          <img className={styles.logo} src={logo} alt="logo" />
        </div>
        <div className={styles.description}>
          <span className={styles.carName}>{name}</span>
          <div className={styles.sellerLink}>
            <a>auto.ria.com</a>
          </div>
          <div className={styles.trigger}>
            <div>{description}</div>
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.colorBox} />
          <div className={styles.price}>{`$ ${price}`}</div>
          <ButtonOutline
            className={styles.buyButton}
            text="Buy"
            onClick={handleBuy}
          />
        </div>
      </div>
      <div className={styles.dividerDiv}>
        <Divider className={styles.divider} />
      </div>
    </>
  );
};

export { WhereBuyItem };
