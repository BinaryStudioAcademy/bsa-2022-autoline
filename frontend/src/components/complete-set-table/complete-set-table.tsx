import { MouseEvent, useContext } from 'react';

import { ComplectationDetailsType, WishlistInput } from '@autoline/shared';
import { CarSetOptions } from '@common/enums/enums';
import { CompleteSetPropsType } from '@common/types/types';
import { HeartIcon, OptionsIcon } from '@components/common/icons/icons';
import { CompareContext } from '@contexts/compare-context';
import { WishlistContext } from '@contexts/wishlist-context';
import { formatPrice } from '@helpers/helpers';
import BalanceIcon from '@mui/icons-material/Balance';
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
  const { className, data, onClick, activeRowId } = props;
  const { likedCars, handleLikeClick } = useContext(WishlistContext);
  const { comparedCars, handleCompareClick } = useContext(CompareContext);

  const likeClick = ({
    complectationId,
    carName,
  }: {
    complectationId: string;
    carName: string;
  }): void => {
    const data: WishlistInput = {
      complectationId,
      carName,
    };
    handleLikeClick(data);
  };

  const compareClick = (car: ComplectationDetailsType): void => {
    handleCompareClick(car.id, `${car.brand} ${car.model} ${car.name}`);
  };

  const rowClick = (id: string): void => {
    if (onClick) {
      onClick(id);
    }
  };

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
            <TableCell className={clsx(styles.tableTitle, styles.iconCell)} />
            <TableCell className={clsx(styles.tableTitle, styles.iconCell)} />
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
            <TableRow
              key={car.id}
              className={clsx(
                styles.tableRow,
                activeRowId && activeRowId === car.id
                  ? styles.tableRowActive
                  : '',
              )}
              onClick={(event: MouseEvent): void => {
                event.stopPropagation();
                rowClick(car.id);
              }}
            >
              <TableCell
                className={clsx(styles.tableRow, styles.iconCell)}
                align="center"
              >
                <button
                  className={clsx(
                    styles.button,
                    styles.iconButton,
                    styles.likeButton,
                    likedCars?.includes(car.id) && styles.isLiked,
                  )}
                  onClick={(event: MouseEvent): void => {
                    event.stopPropagation();
                    likeClick({
                      complectationId: car.id,
                      carName: `${car.brand} ${car.model} ${car.name}`,
                    });
                  }}
                >
                  <HeartIcon />
                </button>
              </TableCell>
              <TableCell
                className={clsx(styles.tableRow, styles.iconCell)}
                align="center"
              >
                <button
                  className={clsx(
                    styles.button,
                    styles.iconButton,
                    styles.compareButton,
                    comparedCars?.includes(car.id) && styles.isCompared,
                  )}
                  onClick={(event: MouseEvent): void => {
                    event.stopPropagation();
                    compareClick(car);
                  }}
                >
                  <BalanceIcon color="primary" sx={{ fontSize: 20 }} />
                </button>
              </TableCell>
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
