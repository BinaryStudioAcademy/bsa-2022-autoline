import React, { FC, useEffect, useMemo, useState } from 'react';

import { filtersToQuery } from '@helpers/filters-to-query';
import { getValueById } from '@helpers/get-value-by-id';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button } from '@mui/material';
import {
  removeBrandDetailsFilter,
  removeCheckListFilter,
  removeRangeFilter,
  resetAllFilters,
} from '@store/car-filter/slice';
import { useGetUsedOptionsQuery } from '@store/queries/cars';

import styles from './styles.module.scss';

const AppliedFiltersBar: FC = () => {
  const dispatch = useAppDispatch();

  const [appliedFIlters, setAppliedFilters] = useState<string[][]>([]);

  const { rangeFilters, checkLists, brandDetails } = useAppSelector(
    (state) => state.carFilter,
  );

  const { data: options } = useGetUsedOptionsQuery();
  const allOptions = useMemo(
    () => options && Object.values(options).flatMap((item) => item),
    [options],
  );

  const deleteFilter = (filterName: string, id: string): void => {
    switch (filterName) {
      case 'price':
      case 'year':
      case 'race':
        dispatch(removeRangeFilter({ filterName }));
        break;

      case 'brandId':
      case 'modelId':
        dispatch(removeBrandDetailsFilter({ filterName, id }));
        break;

      default:
        dispatch(removeCheckListFilter({ filterName, id }));
        break;
    }
  };

  const getRangeIcon = (rangeName: string): string => {
    switch (rangeName) {
      case 'year':
        return 'year ';
      case 'price':
        return '$ ';
      case 'race':
        return 'km ';
      default:
        return '';
    }
  };

  useEffect(() => {
    if (options) {
      const ranges = Object.entries(rangeFilters)
        .map((item) => {
          const label = Object.values(item[1])
            .filter((value) => value !== '')
            .sort((a, b) => +a - +b)
            .join(' - ');

          const icon = label !== '' ? getRangeIcon(item[0]) : '';

          return [item[0], item[0], `${icon}${label}`];
        })
        .filter((range) => range[2] !== '');

      const details: string[][] = [];

      brandDetails.forEach((item) => {
        if (item.brandId !== '') {
          details.push(['brandId', item.brandId, item.brandName]);
        }
        if (item.modelId !== '') {
          details.push(['modelId', item.modelId, item.modelName]);
        }
      });

      const uniqueDetails = [
        ...new Set(details.map((o) => JSON.stringify(o))),
      ].map((s) => JSON.parse(s));

      const checkedArr = filtersToQuery(checkLists);

      const checkboxes = checkedArr.map(([filterName, id]) => {
        const value = allOptions && getValueById(allOptions, id);
        return [filterName, id, value?.label || ''];
      });

      setAppliedFilters([...uniqueDetails, ...ranges, ...checkboxes]);
    }
  }, [rangeFilters, checkLists, brandDetails]);

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
