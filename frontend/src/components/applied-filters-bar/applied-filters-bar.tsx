import React, { useEffect, useMemo, useState } from 'react';

import { ModelType } from '@autoline/shared/common/types/types';
import { CheckListsNames } from '@common/enums/car/car-filters-names.enum';
import { getRangeSymbol } from '@helpers/car-filters/get-range-symbol';
import { objectToQueryString } from '@helpers/object-to-query';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Chip } from '@mui/material';
import {
  removeBrandDetails,
  removeRangeValue,
  resetAllFilters,
  setBrandDetailsValue,
  setCheckListValue,
} from '@store/car-filter/slice';
import { useLazyGetModelsOfBrandQuery } from '@store/queries/cars';
import {
  selectAppliedBrands,
  selectNormalizedBrands,
  selectNormalizedOptionsInAutocompleteType,
} from '@store/selectors/car-filter-selectors';

import styles from './styles.module.scss';

const AppliedFiltersBar: () => false | JSX.Element = () => {
  const dispatch = useAppDispatch();

  const { rangeFilters, checkLists, brandDetails } = useAppSelector(
    (state) => state.carFilter,
  );
  const [appliedRanges, setAppliedRanges] = useState<string[][]>();
  const [appliedCheckboxes, setAppliedCheckboxes] = useState<string[][]>();
  const [appliedBrandDetails, setAppliedBrandDetails] = useState<string[][]>();

  const [normalizedModels, setNormalizedModels] = useState<{
    [p: string]: ModelType;
  }>({});

  const normalizedOptions = useAppSelector(
    selectNormalizedOptionsInAutocompleteType,
  );

  const normalizedBrands = useAppSelector(selectNormalizedBrands);

  const allAppliedBrands = useAppSelector(selectAppliedBrands);

  const [getModelsOfBrand, models] = useLazyGetModelsOfBrandQuery();

  useEffect(() => {
    allAppliedBrands.forEach((brandId) => {
      getModelsOfBrand(brandId, true);
    });
  }, [brandDetails]);

  useEffect(() => {
    if (!models.data) return;

    const newModels = models.data.reduce(
      (obj, item) => Object.assign(obj, { [item.id]: item }),
      {},
    );
    setNormalizedModels({ ...normalizedModels, ...newModels });
  }, [models]);

  const handleRangeDelete = (rangeName: string): void => {
    dispatch(removeRangeValue(rangeName));
  };

  const handleCheckboxDelete = (filterName: string, id: string): void => {
    const newList = checkLists[filterName as CheckListsNames].filter(
      (item) => item !== id,
    );

    dispatch(setCheckListValue({ filterName: filterName, value: newList }));
  };

  const handleBrandDetailDelete = (filterName: string, id: string): void => {
    if (filterName === 'brandId') {
      const detail = brandDetails.filter((item) => item.brandId === id)[0];
      dispatch(removeBrandDetails(detail.id));
    }
    if (filterName === 'modelId') {
      const detail = brandDetails.filter((item) =>
        item.modelIds.includes(id),
      )[0];
      const newDetail = {
        ...detail,
        modelIds: detail.modelIds.filter((modelId) => modelId !== id),
      };
      dispatch(setBrandDetailsValue(newDetail));
    }
  };

  useEffect(() => {
    const ranges = Object.entries(rangeFilters)
      .map((item) => {
        const label = Object.values(item[1])
          .filter((value) => value !== '')
          .sort((a, b) => +a - +b)
          .join(' - ');

        const icon = label !== '' ? getRangeSymbol(item[0]) : '';

        return [item[0], `${icon}${label}`];
      })
      .filter((range) => range[1] !== '');

    setAppliedRanges(ranges);
  }, [rangeFilters]);

  useEffect(() => {
    if (!normalizedOptions) return;

    const checkboxes = objectToQueryString(checkLists).map(
      ([filterName, id]) => {
        const value = normalizedOptions[id];
        return [filterName, id, value?.label || ''];
      },
    );
    setAppliedCheckboxes(checkboxes);
  }, [checkLists]);

  useEffect(() => {
    if (!normalizedBrands) return;

    const details: string[][] = [];

    brandDetails.forEach((item) => {
      if (item.brandId !== '') {
        details.push([
          'brandId',
          item.brandId,
          normalizedBrands[item.brandId]['name'],
        ]);
      }
      if (item.modelIds.length) {
        item.modelIds.forEach((modelId) => {
          details.push([
            'modelId',
            modelId,
            normalizedModels[modelId] && normalizedModels[modelId]['name'],
          ]);
        });
      }
    });

    setAppliedBrandDetails(details);
  }, [brandDetails, normalizedBrands]);

  const resetFilters = (): void => {
    dispatch(resetAllFilters());
  };

  const isAnyApplies = useMemo(() => {
    return Boolean(
      appliedCheckboxes?.length ||
        appliedRanges?.length ||
        appliedBrandDetails?.length,
    );
  }, [appliedRanges, appliedBrandDetails, appliedCheckboxes]);

  return (
    isAnyApplies && (
      <div className={styles.container}>
        {appliedBrandDetails &&
          appliedBrandDetails.map(([filterName, id, label]) => (
            <Chip
              className={styles.chip}
              key={id}
              size="small"
              label={label}
              variant="outlined"
              onDelete={(): void => handleBrandDetailDelete(filterName, id)}
            />
          ))}

        {appliedRanges &&
          appliedRanges.map(([rangeName, label]) => (
            <Chip
              className={styles.chip}
              key={label}
              size="small"
              label={label}
              variant="outlined"
              onDelete={(): void => handleRangeDelete(rangeName)}
            />
          ))}

        {appliedCheckboxes &&
          appliedCheckboxes.map(([filterName, id, label]) => (
            <Chip
              className={styles.chip}
              key={id}
              size="small"
              label={label}
              variant="outlined"
              onDelete={(): void => handleCheckboxDelete(filterName, id)}
            />
          ))}
        {isAnyApplies && (
          <Chip
            className={styles.deleteButton}
            size="small"
            label="Delete all"
            onClick={resetFilters}
            onDelete={resetFilters}
            deleteIcon={<DeleteOutlinedIcon />}
          />
        )}
      </div>
    )
  );
};

export { AppliedFiltersBar };
