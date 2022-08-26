import React, { FC, useEffect, useMemo, useState } from 'react';

import { AutoRiaOption } from '@autoline/shared/common/types/types';
import { FiltersNames } from '@common/enums/cars/filters-names.enum';
import { pricesRange, yearsRange } from '@common/enums/cars/ranges';
import { AutocompleteValueType } from '@common/types/cars/autocomplete.type';
import { BrandDetailsType } from '@common/types/cars/brand-details.type';
import { RangeValueType } from '@common/types/cars/range-item.type';
import { BrandDetails } from '@components/advanced-auto-filter/brand-details/brand-details';
import { AutocompleteInput } from '@components/common/autocomplete-input/autocomplete-input';
import { RangeSelector } from '@components/common/range-selector/range-selector';
import { filtersToQuery } from '@helpers/filters-to-query';
import { getValueById } from '@helpers/get-value-by-id';
import { useAppDispatch, useAppSelector } from '@hooks/store/store.hooks';
import { changeBrandDetails, setValue } from '@store/car-filter/slice';
import {
  useGetFilteredCarsQuery,
  useGetUsedOptionsQuery,
} from '@store/queries/cars';

import styles from './styles.module.scss';

const SimpleAutoFilter: FC = () => {
  const dispatch = useAppDispatch();

  const filters = useAppSelector((state) => state.carFilter.filters);

  const brandDetail = useAppSelector(
    (state) => state.carFilter.brandDetails,
  )[0];

  const [queryParams, setQueryParams] = useState<string[][]>([]);

  useEffect(() => {
    setQueryParams(
      filtersToQuery({
        ...filters,
        brandId: [brandDetail.brandId],
        modelId: [brandDetail.modelId],
      }),
    );
  }, [filters, brandDetail]);

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
    dispatch(setValue({ filterName: FiltersNames.REGION_ID, value }));
  };

  const handleBrandDetailsChange = (data: BrandDetailsType): void => {
    dispatch(changeBrandDetails(data));
  };

  const handleRangeChange = (range: RangeValueType[]): void => {
    range.forEach(({ filterName, value }) => {
      dispatch(setValue({ filterName, value }));
    });
  };

  if (isOptionsLoading) return <h1>Loading...</h1>;
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
    </div>
  );
};

export { SimpleAutoFilter };
