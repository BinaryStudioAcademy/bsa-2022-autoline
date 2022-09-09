import styles from './styles.module.scss';

export const NoActiveComparison = (): React.ReactElement => (
  <div className={styles.noCarsError}>
    You have got no cars
    <br />
    in this comparison yet.
  </div>
);
