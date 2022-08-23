import { useState } from 'react';

import { CarSetOptions } from '@common/enums/enums';
import { CompleteSetPropsType } from '@common/types/types';
import { OptionsIcon } from '@components/common/icons/icons';
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

import { mockCars } from './mock-cars';
import styles from './styles.module.scss';

const CompleteSetTable: React.FC = () => {
  const [cars] = useState<CompleteSetPropsType[]>(mockCars);

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      className={clsx(styles.tableContainer, styles.container)}
    >
      <Table
        sx={{ minWidth: 650 }}
        aria-label="complete set table"
        className={styles.table}
      >
        <TableHead>
          <TableRow>
            <TableCell className={styles.tableTitle}>
              {CarSetOptions.Model}
            </TableCell>
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
              {CarSetOptions.Race}
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
          {cars.map((car) => (
            <TableRow key={car.id} className={styles.tableRow}>
              <TableCell className={styles.tableRow}>
                {car.brand} {car.model}
              </TableCell>
              <TableCell className={styles.tableRow}>
                {car.complectation}
              </TableCell>
              <TableCell className={styles.tableRow}>
                <div
                  className={styles.colorBox}
                  style={{ backgroundColor: car.color }}
                />
              </TableCell>
              <TableCell className={styles.tableRow}>{car.motor}</TableCell>
              <TableCell className={styles.tableRow}>
                {car.wheelDrive}
              </TableCell>
              <TableCell className={styles.tableRow}>{car.race}</TableCell>
              <TableCell className={clsx(styles.tableRow, styles.price)}>
                {car.price}
              </TableCell>
              <TableCell className={styles.tableRow}>
                <button className={styles.pillButton}>
                  <OptionsIcon /> <span>{car.options}</span>
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
