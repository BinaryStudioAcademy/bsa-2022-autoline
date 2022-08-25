import React, { FC } from 'react';

import { useAppDispatch } from '@hooks/hooks';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button } from '@mui/material';
import { PayloadAction } from '@reduxjs/toolkit';
import { resetAllFilters } from '@store/car-filter/slice';

import styles from './styles.module.scss';

const AppliedFiltersBar: FC = () => {
  const dispatch = useAppDispatch();

  const mocked = ['Sedan', 'Lviv', '2014-2018'];

  const resetFilters = (): PayloadAction => dispatch(resetAllFilters());

  return (
    <div className={styles.container}>
      {mocked.map((item, index) => (
        <div className={styles.item} key={index}>
          {item}
          <HighlightOffIcon />
        </div>
      ))}
      <Button
        onClick={resetFilters}
        className={styles.deleteButton}
        variant="contained"
        startIcon={<DeleteOutlinedIcon className={styles.deleteIcon} />}
      >
        Delete all
      </Button>
    </div>
  );
};

export { AppliedFiltersBar };
