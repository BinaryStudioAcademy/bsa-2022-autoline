import { CarSetOptions } from '@common/enums/enums';
import { CompleteSetPropsType } from '@common/types/types';
import { OptionsIcon } from '@components/common/icons/icons';
import { formatPrice } from '@helpers/helpers';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

const CompleteSetTable: React.FC<CompleteSetPropsType> = (props) => {
  const { className, data } = props;

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      className={clsx(styles.tableContainer, styles.container, className)}
    >
      <Table
        sx={{ minWidth: 650 }}
        aria-label="complete set table"
        className={styles.table}
      >
        <TableHead>
          <TableRow>
            <TableCell className={styles.tableTitle}>
              {CarSetOptions.Complectation}
            </TableCell>
            <TableCell className={styles.tableTitle}>
              {CarSetOptions.Color}
            </TableCell>
            <TableCell className={styles.tableTitle}>
              {CarSetOptions.Motor}
            </TableCell>
            <TableCell className={styles.tableTitle}>
              {CarSetOptions.WheelDrive}
            </TableCell>
            <TableCell className={styles.tableTitle}>
              {CarSetOptions.Engine}
            </TableCell>
            <TableCell className={styles.tableTitle}>
              {CarSetOptions.EnginePower}
            </TableCell>
            <TableCell className={styles.tableTitle}>
              {CarSetOptions.Price}
            </TableCell>
            <TableCell className={styles.tableTitle}>
              {CarSetOptions.Compare}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((car) => (
            <TableRow key={car.id} className={styles.tableRow}>
              <TableCell className={styles.tableRow}>{car.name}</TableCell>
              <TableCell className={styles.tableRow}>
                <div
                  className={styles.colorBox}
                  style={{ backgroundColor: car.colorName }}
                />
              </TableCell>
              <TableCell className={clsx(styles.tableRow, styles.motorRow)}>
                {car.fuelTypeName} {car.engineDisplacement} l.
              </TableCell>
              <TableCell className={styles.tableRow}>
                {car.transmissionTypeName}
              </TableCell>
              <TableCell className={clsx(styles.tableRow, styles.engineRow)}>
                {car.engine}
              </TableCell>
              <TableCell
                className={clsx(styles.tableRow, styles.enginePowerRow)}
              >
                {car.enginePower} h.p.
              </TableCell>
              <TableCell className={clsx(styles.tableRow, styles.price)}>
                {formatPrice(car.priceStart)} - {formatPrice(car.priceEnd)}
              </TableCell>
              <TableCell className={clsx(styles.tableRow, styles.optionsRow)}>
                <button className={styles.pillButton}>
                  <OptionsIcon /> <span>{car.optionsCount} options</span>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { CompleteSetTable };
