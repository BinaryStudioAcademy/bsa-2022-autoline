import { FC } from 'react';

import { useGetComplectationsQuery } from '@store/queries/details-panel';

import styles from './styles.module.scss';

const DetailsCarPanel: FC = () => {
  const { data } = useGetComplectationsQuery(
    '63ba5d0c-f7fa-4a6d-bf82-4fbb67a04136',
  );
  console.log(data);
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
          <div className={styles.complectationValue}>
            {data?.engineDisplacements.join(' / ')} l.
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Engine Power</div>
          <div className={styles.complectationValue}>
            {data?.enginePowers.join(' / ')} h.p.
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Color</div>
          <div className={styles.complectationValue}>
            {data?.colors.join(' / ')}
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Drivetrain</div>
          <div className={styles.complectationValue}>
            {data?.drivetrains.join(' / ')}
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Fuel type</div>
          <div className={styles.complectationValue}>
            {data?.fuelTypes.join(' / ')}
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Transmission</div>
          <div className={styles.complectationValue}>
            {data?.transmissionTypes.join(' / ')}
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Multimedia</div>
          <div className={styles.complectationValue}>
            {data?.options.multimedia.join(', ')}
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Security</div>
          <div className={styles.complectationValue}>
            {data?.options.security.join(', ')}
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Optics</div>
          <div className={styles.complectationValue}>
            {data?.options.optics.join(', ')}
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Upholstery</div>
          <div className={styles.complectationValue}>
            {data?.options.upholstery.join(', ')}
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Sound</div>
          <div className={styles.complectationValue}>
            {data?.options.sound.join(', ')}
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Design</div>
          <div className={styles.complectationValue}>
            {data?.options.design.join(', ')}
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Comfort</div>
          <div className={styles.complectationValue}>
            {data?.options.comfort.join(', ')}
          </div>
        </div>
        <div className={styles.complectationRow}>
          <div className={styles.complectationName}>Auxiliary</div>
          <div className={styles.complectationValue}>
            {data?.options.auxiliary.join(', ')}
          </div>
        </div>
      </div>
    </div>
  );
};

export { DetailsCarPanel };
