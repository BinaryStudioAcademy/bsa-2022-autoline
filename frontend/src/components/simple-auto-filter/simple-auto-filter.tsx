import React, { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AutoRiaOption } from '@autoline/shared/common/types/types';
import { FiltersNames } from '@common/enums/car/car-filters-names.enum';
import { pricesRange, yearsRange } from '@common/enums/car/ranges';
import { AutocompleteValueType } from '@common/types/cars/autocomplete.type';
import { BrandDetailsType } from '@common/types/cars/brand-details.type';
import { RangeValueType } from '@common/types/cars/range-item.type';
import { BrandDetails } from '@components/advanced-auto-filter/brand-details/brand-details';
import { AutocompleteInput } from '@components/common/autocomplete-input/autocomplete-input';
import { RangeSelector } from '@components/common/range-selector/range-selector';
import { getValueById } from '@helpers/get-value-by-id';
import { objectToQueryString } from '@helpers/object-to-query';
import { useAppDispatch, useAppSelector } from '@hooks/store/store.hooks';
import { Button, Zoom } from '@mui/material';
import {
  addNewBrandDetails,
  setBrandDetailsValue,
  setValue,
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

  const { filters, brandDetails } = useAppSelector((state) => state.carFilter);

  const [queryParams, setQueryParams] = useState<string[][]>([]);

  const { data: options, isLoading: isLoading } = useGetUsedOptionsQuery();

  useEffect(() => {
    setQueryParams(objectToQueryString(filters));
  }, [filters]);

  const [search, filteredCars] = useLazyGetFilteredCarsQuery();

  // eslint-disable-next-line no-console
  console.log(filteredCars);

  const years = useMemo(() => yearsRange(30), []);

  const handleRegionChange = (data: AutocompleteValueType): void => {
    const value = data?.id || '';
    dispatch(setValue({ filterName: FiltersNames.REGION_ID, value }));
  };

  const handleAddNewDetails = (): void => {
    dispatch(addNewBrandDetails());
  };

  const handleBrandDetailsChange = (data: BrandDetailsType): void => {
    dispatch(setBrandDetailsValue(data));
  };

  const handleRangeChange = (range: RangeValueType[]): void => {
    range.forEach(({ filterName, value }) => {
      dispatch(setValue({ filterName, value }));
    });
  };

  const isButtonVisible = Boolean(
    Object.values(filters).some((filter) => filter.length >= 1),
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
          value={getValueById(options.regions, filters.regionId)}
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
              selectedMin={filters.yearStart}
              selectedMax={filters.yearEnd}
              onChange={handleRangeChange}
              minFilterName={FiltersNames.YEAR_START}
              maxFilterName={FiltersNames.YEAR_END}
            />
          </div>
          <div className={styles.row}></div>
          <div className={styles.row}>
            <RangeSelector
              list={pricesRange.map((item: number) => item.toString())}
              minTitle="$ Min"
              maxTitle="$ Max"
              minFilterName={FiltersNames.PRICE_START}
              maxFilterName={FiltersNames.PRICE_END}
              selectedMin={filters.priceStart}
              selectedMax={filters.priceEnd}
              onChange={handleRangeChange}
            />
          </div>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Zoom in={isButtonVisible}>
          <Button
            onClick={doSearch}
            disabled={!isButtonVisible}
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
