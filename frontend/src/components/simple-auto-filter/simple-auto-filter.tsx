import React, { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AutoRiaOption } from '@autoline/shared/common/types/types';
import { FiltersNames } from '@common/enums/cars/filters-names.enum';
import { pricesRange, yearsRange } from '@common/enums/cars/ranges';
import { AutocompleteValueType } from '@common/types/cars/autocomplete.type';
import { RangeValueType } from '@common/types/cars/range-item.type';
import { AutocompleteInput } from '@components/common/autocomplete-input/autocomplete-input';
import { RangeSelector } from '@components/common/range-selector/range-selector';
import { SelectField } from '@components/common/select-field/select-field';
import { filtersToQuery } from '@helpers/filters-to-query';
import { getValueById } from '@helpers/get-value-by-id';
import { useAppDispatch, useAppSelector } from '@hooks/store/store.hooks';
import { Button, Zoom } from '@mui/material';
import { setValue } from '@store/car-filter/slice';
import { API } from '@store/queries/api_routes';
import {
  useGetBrandsQuery,
  useGetFilteredCarsQuery,
  useGetModelsOfBrandQuery,
  useGetUsedOptionsQuery,
} from '@store/queries/cars';

import styles from './styles.module.scss';

const SimpleAutoFilter: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const filters = useAppSelector((state) => state.carFilter);

  const [queryParams, setQueryParams] = useState<string[][]>([]);

  const { data: brands, isLoading } = useGetBrandsQuery();

  const { data: options, isLoading: isOptionsLoading } =
    useGetUsedOptionsQuery();

  const { data: models } = useGetModelsOfBrandQuery(filters.brandId[0], {
    skip: !filters.brandId.length,
  });

  useEffect(() => {
    setQueryParams(filtersToQuery(filters));
  }, [filters]);

  const { data: filteredCars } = useGetFilteredCarsQuery(queryParams, {
    skip: !queryParams,
  });

  // eslint-disable-next-line no-console
  console.log(filteredCars);

  const years = useMemo(() => yearsRange(30), []);

  const handleRegionChange = (data: AutocompleteValueType): void => {
    const value = data?.id || '';
    dispatch(setValue({ filterName: FiltersNames.REGION_ID, value }));
  };

  const handleSelectBrand = (data: AutocompleteValueType): void => {
    dispatch(
      setValue({
        filterName: FiltersNames.BRAND_ID,
        value: data?.id ? [data.id] : [],
      }),
    );

    dispatch(
      setValue({
        filterName: FiltersNames.MODEL_ID,
        value: [],
      }),
    );
  };

  const handleSelectModel = (data: AutocompleteValueType): void => {
    dispatch(
      setValue({
        filterName: FiltersNames.MODEL_ID,
        value: data?.id ? [data.id] : [],
      }),
    );
  };

  const handleRangeChange = (range: RangeValueType[]): void => {
    range.forEach(({ filterName, value }) => {
      dispatch(setValue({ filterName, value }));
    });
  };

  const isButtonVisible = Boolean(
    Object.values(filters).some((filter) => filter.length >= 1),
  );

  const navigateToSearch = (): void => navigate(API.SEARCH);

  if (isLoading || isOptionsLoading) return <h1>Loading...</h1>;
  return (
    <div className={styles.container}>
      <h5 className={styles.title}>SELECT YOUR CAR</h5>

      {options && (
        <AutocompleteInput
          label="Regions"
          onChange={handleRegionChange}
          value={getValueById(options.regions, filters.regionId)}
          options={options?.regions?.map((item: AutoRiaOption) => ({
            label: item.name,
            id: item.id,
          }))}
        />
      )}

      <div className={styles.mainRow}>
        <div className={styles.column}>
          {brands && (
            <AutocompleteInput
              label="Brand"
              onChange={handleSelectBrand}
              value={getValueById(brands, filters.brandId[0])}
              options={brands?.map((item) => ({
                label: item.name,
                id: item.id,
              }))}
            />
          )}

          {models ? (
            <AutocompleteInput
              label="Model"
              onChange={handleSelectModel}
              value={getValueById(models, filters.modelId[0])}
              options={models?.map((item) => ({
                label: item.name,
                id: item.id,
              }))}
            />
          ) : (
            <SelectField
              id="disabled"
              name="Model"
              value=""
              disabled={true}
              required={false}
            >
              disabled
            </SelectField>
          )}
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
