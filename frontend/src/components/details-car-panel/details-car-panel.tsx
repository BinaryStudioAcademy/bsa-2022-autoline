import { FC } from 'react';

import { mockCarData } from './mock-cars-data';
import styles from './styles.module.scss';

const DetailsCarPanel: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.price}>$ 34 000 - 52 450</div>
        <div className={styles.priceUah}>UAH 1 554 000 - 1 945 450</div>
      </div>
      <div className={styles.lables}>
        <div className={styles.label}>Lather Interior</div>
        <div className={styles.label}>LED Headlight</div>
        <div className={styles.label}>Crossover</div>
        <div className={styles.label}>LCD screen</div>
        <div className={styles.label}>ABS</div>
        <div className={styles.label}>BAS / EBD</div>
        <div className={styles.label}>Recognition of road signs</div>
        <div className={styles.label}>VSM</div>
      </div>
      <div className={styles.complectation}>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Motor</div>
          <div className={styles.complectationValue}>3 / 3.5 / 4 / 5 l.</div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Engine Power</div>
          <div className={styles.complectationValue}>
            {mockCarData.map((e) => `${e.engine_power} /`)} h.p.
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Design</div>
          <div className={styles.complectationValue}>
            {mockCarData.map((e) =>
              e.options.map((e) => (e.type === 'design' ? `${e.name}, ` : '')),
            )}
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Auxiliary</div>
          <div className={styles.complectationValue}>
            {mockCarData.map((e) =>
              e.options.map((e) =>
                e.type === 'auxiliary' ? `${e.name}, ` : '',
              ),
            )}
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Multimedia</div>
          <div className={styles.complectationValue}>
            Acoustics, Navigation system, Multimedia system with LCD screen,
            Bluetooth, USB, Voice control
          </div>
        </div>
      </div>
    </div>
  );
};

export { DetailsCarPanel };
