import { useState, useEffect, useRef } from 'react';

import logo from '@assets/images/logo-autoria.png';
import mapPin from '@assets/images/map-pin.svg';
import speedometr from '@assets/images/speedometr.svg';
import { AutoRiaLinks } from '@common/enums/app/app';
import { WhereBuyInterface } from '@common/types/where-to-buy/where-to-buy';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { formatPrice } from '@helpers/helpers';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import { useReviewedCarMutation } from '@store/queries/reviewed-cars';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

interface WhereBuyItemProps {
  poster: WhereBuyInterface;
  modelId: string;
}

const WhereBuyItem: React.FC<WhereBuyItemProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const maxHeight = 48;
  useEffect(() => {
    const { current: appElement } = elementRef;
    setHeight(appElement?.clientHeight as number);
  }, []);
  const [reviewCar] = useReviewedCarMutation();
  const {
    USD: price,
    autoData: { description, year, raceInt: race, autoId: autoriaCode },
    linkToView,
    title,
    color: { hex: color },
    stateData: { regionNameEng: location },
  } = props.poster;
  const modelId = props.modelId;
  const url = `${AutoRiaLinks.LINK_ADVERT}${linkToView}`;
  const formatedPrice = formatPrice(price);

  const handleBuy = (): void => {
    const token = localStorage.getItem('token');
    if (token) {
      reviewCar({ modelId, autoriaCode });
    }
    window.open(url, '_blank');
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.description}>
          <span className={styles.carName}>{title}</span>
          <div className={styles.labelGroup}>
            <div className={styles.label}>
              <img src={speedometr} alt="speedometr" />
              {`${race} 000 km`}
            </div>
            <div className={styles.label}> {`${year} year`} </div>
            <div className={clsx(styles.label, styles.location)}>
              <img src={mapPin} alt="location" />
              {location}
            </div>
          </div>
          {description.length ? (
            <div className={styles.trigger}>
              <div
                ref={elementRef}
                className={clsx(styles.textDescription, {
                  [(styles.textDescription, styles.more)]: open,
                })}
              >
                {description}
              </div>
              {height >= maxHeight && (
                <button
                  className={styles.collapseButton}
                  onClick={(): void => setOpen(!open)}
                >
                  {open ? (
                    <ExpandLess />
                  ) : (
                    <>
                      Read more
                      <ExpandMore />
                    </>
                  )}
                </button>
              )}
            </div>
          ) : null}
        </div>
        <div className={styles.panel}>
          <div className={styles.colorBox} style={{ backgroundColor: color }} />
          <div className={styles.price}>{`${formatedPrice}`}</div>
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
    </div>
  );
};

export { WhereBuyItem };
