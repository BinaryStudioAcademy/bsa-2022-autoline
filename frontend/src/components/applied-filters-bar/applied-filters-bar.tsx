import React, { FC, useEffect, useState } from 'react';

import { filtersToQuery } from '@helpers/filters-to-query';
import { getValueById } from '@helpers/get-value-by-id';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button } from '@mui/material';
import { resetAllFilters } from '@store/car-filter/slice';
import {
  useGetBrandsQuery,
  useGetModelsOfBrandQuery,
  useGetUsedOptionsQuery,
} from '@store/queries/cars';

import styles from './styles.module.scss';

const AppliedFiltersBar: FC = () => {
  const dispatch = useAppDispatch();

  const [appliedFIlters, setAppliedFilters] = useState<string[][]>([]);

  const filters = useAppSelector((state) => state.carFilter);

  const { data: brands } = useGetBrandsQuery();

  const { data: models } = useGetModelsOfBrandQuery(filters.brandId[0], {
    skip: !filters.brandId.length,
  });

  const { data: options } = useGetUsedOptionsQuery();

  const deleteFilter = (filterName: string, id: string): void => {
    // eslint-disable-next-line no-console
    console.log(filterName);
    // eslint-disable-next-line no-console
    console.log(id);
  };

  useEffect(() => {
    if (brands && options) {
      const allOptions = Object.values(options)
        .flatMap((item) => item)
        .concat(brands)
        .concat(models || []);

      const filtersArr = filtersToQuery(filters);

      //MAP!!!!!!!!!!!!!!
      // const withLabels = filtersArr.map(([filterName, id, label]) => {
      const withLabels = filtersArr.map(([filterName, id]) => {
        if (filterName.includes('year')) {
          const { yearStart, yearEnd } = filters;
          return [filterName, id, `${yearStart} - ${yearEnd}`];
        }

        const value = getValueById(allOptions, id);

        return [filterName, id, value?.label || ''];
      });

      setAppliedFilters(withLabels);
    }
  }, [filters]);

  const resetFilters = (): void => {
    dispatch(resetAllFilters());
  };

  return (
    <div className={styles.container}>
      {appliedFIlters.map(([filterName, id, label]) => (
        <div className={styles.item} key={id}>
          {label}
          <HighlightOffIcon
            onClick={(): void => deleteFilter(filterName, id)}
          />
        </div>
      ))}

      {!!appliedFIlters.length && (
        <Button
          onClick={resetFilters}
          className={styles.deleteButton}
          variant="contained"
          startIcon={<DeleteOutlinedIcon className={styles.deleteIcon} />}
        >
          Delete all
        </Button>
      )}
    </div>
  );
};

export { AppliedFiltersBar };
