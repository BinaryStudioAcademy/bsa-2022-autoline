import React, { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AutoRiaOption } from '@autoline/shared/common/types/types';
import {
  CheckListsNames,
  RangeNames,
  RangeValueNames,
} from '@common/enums/car/car-filters-names.enum';
import { pricesRange, yearsRange } from '@common/enums/car/ranges';
import { AutocompleteValueType } from '@common/types/cars/autocomplete.type';
import { BrandDetailsType } from '@common/types/cars/brand-details.type';
import { RangeValueType } from '@common/types/cars/range-item.type';
import { BrandDetails } from '@components/advanced-auto-filter/brand-details/brand-details';
import { AutocompleteInput } from '@components/common/autocomplete-input/autocomplete-input';
import { RangeSelector } from '@components/common/range-selector/range-selector';
import { isFiltersEmpty } from '@helpers/car-filters/is-filters-empty';
import { rangeFiltersToObject } from '@helpers/car-filters/range-filters-to-object';
import { getValueById } from '@helpers/get-value-by-id';
import { objectToQueryString } from '@helpers/object-to-query';
import { useAppDispatch, useAppSelector } from '@hooks/store/store.hooks';
import { Button, Zoom } from '@mui/material';
import {
  addNewBrandDetails,
  setBrandDetailsValue,
  setCheckListValue,
  setRangeValue,
} from '@store/car-filter/slice';
import { API } from '@store/queries/api-routes';
import {
  useGetUsedOptionsQuery,
  useLazyGetFilteredCarsQuery,
} from '@store/queries/cars';

import styles from './styles.module.scss';

const SimpleAutoFilter: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { rangeFilters, checkLists, brandDetails } = useAppSelector(
    (state) => state.carFilter,
  );

  const [queryParams, setQueryParams] = useState<string[][]>([]);

  const { data: options, isLoading: isLoading } = useGetUsedOptionsQuery();

  useEffect(() => {
    setQueryParams(
      objectToQueryString({
        ...rangeFiltersToObject(rangeFilters),
        ...checkLists,
        brandId: brandDetails.map((item) => item.brandId),
        modelId: brandDetails.map((item) => item.modelId),
      }),
    );
  }, [rangeFilters, checkLists, brandDetails]);

  const [search, filteredCars] = useLazyGetFilteredCarsQuery();

  // eslint-disable-next-line no-console
  console.log(filteredCars);

  const years = useMemo(() => yearsRange(30), []);

  const handleRegionChange = (data: AutocompleteValueType): void => {
    const value = [data?.id || ''];
    dispatch(
      setCheckListValue({
        filterName: CheckListsNames.REGION_ID,
        value,
      }),
    );
  };

  const handleAddNewDetails = (): void => {
    dispatch(addNewBrandDetails());
  };

  const handleBrandDetailsChange = (data: BrandDetailsType): void => {
    dispatch(setBrandDetailsValue(data));
  };

  const handleRangeChange = (range: RangeValueType): void => {
    dispatch(setRangeValue(range));
  };

  const isFiltersApplied = Boolean(
    !isFiltersEmpty({ ...rangeFiltersToObject(rangeFilters), ...checkLists }) ||
      brandDetails.some((detail) => detail.brandId !== ''),
  );

  const doSearch = (): void => {
    search(queryParams);
    navigate(API.SEARCH);
  };

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className={styles.container}>
      <h5 className={styles.title}>SELECT YOUR CAR</h5>

      {options && (
        <AutocompleteInput
          label="Regions"
          onChange={handleRegionChange}
          value={getValueById(options.regions, checkLists.regionId[0])}
          options={options.regions.map((item: AutoRiaOption) => ({
            label: item.name,
            id: item.id,
          }))}
        />
      )}

      <div className={styles.mainRow}>
        <div className={styles.column}>
          <div className={styles.row}>
            <h5 className={styles.blockTitle}>Brand Details</h5>
            <h6 className={styles.addButton} onClick={handleAddNewDetails}>
              + Add
            </h6>
          </div>
          {brandDetails.map((brandDetail) => (
            <BrandDetails
              key={brandDetail.id}
              id={brandDetail.id}
              onBrandDetailsChange={handleBrandDetailsChange}
              selectedBrandId={brandDetail.brandId}
              selectedModelId={brandDetail.modelId}
            />
          ))}
        </div>
        <div className={styles.column}>
          <div className={styles.row}>
            <RangeSelector
              list={years}
              minTitle="Year Min"
              maxTitle="Year Max"
              rangeName={RangeNames.YEAR}
              minFilterName={RangeValueNames.YEAR_START}
              maxFilterName={RangeValueNames.YEAR_END}
              selectedMin={rangeFilters.year.yearStart}
              selectedMax={rangeFilters.year.yearEnd}
              onChange={handleRangeChange}
            />
          </div>
          <div className={styles.row}></div>
          <div className={styles.row}>
            <RangeSelector
              list={pricesRange.map((item: number) => item.toString())}
              minTitle="$ Min"
              maxTitle="$ Max"
              rangeName={RangeNames.PRICE}
              minFilterName={RangeValueNames.PRICE_START}
              maxFilterName={RangeValueNames.PRICE_END}
              selectedMin={rangeFilters.price.priceStart}
              selectedMax={rangeFilters.price.priceEnd}
              onChange={handleRangeChange}
            />
          </div>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Zoom in={isFiltersApplied}>
          <Button
            onClick={doSearch}
            disabled={!isFiltersApplied}
            className={styles.searchButton}
            variant="contained"
          >
            SEARCH
          </Button>
        </Zoom>
      </div>
    </div>
  );
};

export { SimpleAutoFilter };
