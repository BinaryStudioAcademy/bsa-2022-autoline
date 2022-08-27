import React, { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AutoRiaOption } from '@autoline/shared/common/types/types';
import {
  CheckListsNames,
  RangeNames,
  RangeValueNames,
} from '@common/enums/cars/filter-names.enum';
import { pricesRange, yearsRange } from '@common/enums/cars/ranges';
import { AutocompleteValueType } from '@common/types/car-filter/autocomplete.type';
import { BrandDetailsType } from '@common/types/car-filter/brand-details.type';
import { RangeValueType } from '@common/types/car-filter/range-value.type';
import { BrandDetails } from '@components/advanced-auto-filter/brand-details/brand-details';
import { AutocompleteInput } from '@components/common/autocomplete-input/autocomplete-input';
import { RangeSelector } from '@components/common/range-selector/range-selector';
import { rangeFiltersToObject } from '@helpers/car-filter/range-filters-to-object';
import { filtersToQuery } from '@helpers/filters-to-query';
import { getValueById } from '@helpers/get-value-by-id';
import { useAppDispatch, useAppSelector } from '@hooks/store/store.hooks';
import { Button, Zoom } from '@mui/material';
import {
  setBrandDetailsValue,
  setCheckListValue,
  setRangeValue,
} from '@store/car-filter/slice';
import { API } from '@store/queries/api-routes';
import {
  useGetFilteredCarsQuery,
  useGetUsedOptionsQuery,
} from '@store/queries/cars';

import styles from './styles.module.scss';

const SimpleAutoFilter: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { rangeFilters, checkLists, brandDetails } = useAppSelector(
    (state) => state.carFilter,
  );

  const brandDetail = useAppSelector(
    (state) => state.carFilter.brandDetails,
  )[0];

  const [queryParams, setQueryParams] = useState<string[][]>([]);

  useEffect(() => {
    setQueryParams(
      filtersToQuery({
        ...checkLists,
        ...rangeFiltersToObject(rangeFilters),
        brandId: brandDetails.map((item) => item.brandId),
        modelId: brandDetails.map((item) => item.modelId),
      }),
    );
  }, [rangeFilters, checkLists, brandDetails]);

  const { data: options, isLoading: isOptionsLoading } =
    useGetUsedOptionsQuery();

  const { data: filteredCars } = useGetFilteredCarsQuery(queryParams, {
    skip: !queryParams,
  });

  // eslint-disable-next-line no-console
  console.log(filteredCars);

  const years = useMemo(() => yearsRange(30), []);

  const handleRegionChange = (data: AutocompleteValueType): void => {
    const value = data?.id || '';
    dispatch(
      setCheckListValue({
        filterName: CheckListsNames.REGION_ID,
        value: [value],
      }),
    );
  };

  const handleBrandDetailsChange = (data: BrandDetailsType): void => {
    dispatch(setBrandDetailsValue(data));
  };

  const handleRangeChange = (range: RangeValueType): void => {
    dispatch(setRangeValue(range));
  };

  const isButtonVisible = Boolean(
    brandDetail.brandId !== '' ||
      Object.values(checkLists).some((list) => list.length) ||
      Object.values(rangeFiltersToObject(rangeFilters)).some(
        (item) => item !== '',
      ),
  );

  const navigateToSearch = (): void => navigate(API.SEARCH);

  if (isOptionsLoading) return <h1>Loading...</h1>;
  return (
    <div className={styles.container}>
      <h5 className={styles.title}>SELECT YOUR CAR</h5>

      {options && (
        <AutocompleteInput
          label="Regions"
          onChange={handleRegionChange}
          value={getValueById(options.regions, checkLists.regionId[0])}
          options={options?.regions?.map((item: AutoRiaOption) => ({
            label: item.name,
            id: item.id,
          }))}
        />
      )}

      <div className={styles.mainRow}>
        <div className={styles.column}>
          <BrandDetails
            key={brandDetail.id}
            id={brandDetail.id}
            selectedBrandId={brandDetail.brandId}
            selectedModelId={brandDetail.modelId}
            onBrandDetailsChange={handleBrandDetailsChange}
          />
        </div>
        <div className={styles.column}>
          <div className={styles.row}>
            <RangeSelector
              list={years}
              minTitle="Year Min"
              maxTitle="Year Max"
              rangeName={RangeNames.YEAR}
              selectedMin={rangeFilters.year.yearStart}
              selectedMax={rangeFilters.year.yearEnd}
              onChange={handleRangeChange}
              minFilterName={RangeValueNames.YEAR_START}
              maxFilterName={RangeValueNames.YEAR_END}
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
        <Zoom in={isButtonVisible}>
          <Button
            onClick={navigateToSearch}
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
