import React, { FC, useEffect, useMemo, useState } from 'react';

import { AutoRiaOption } from '@autoline/shared/common/types/types';
import { FiltersNames } from '@common/enums/cars/filters-names.enum';
import { pricesRange, raceRange, yearsRange } from '@common/enums/cars/ranges';
import { AutocompleteValueType } from '@common/types/cars/autocomplete.type';
import { BrandDetailsType } from '@common/types/cars/brand-details.type';
import { CheckboxListDataType } from '@common/types/cars/checkbox-list-data.type';
import { RangeValueType } from '@common/types/cars/range-item.type';
import { BrandDetails } from '@components/advanced-auto-filter/brand-details/brand-details';
import { AutocompleteInput } from '@components/common/autocomplete-input/autocomplete-input';
import { CheckboxList } from '@components/common/checkbox-list/checkbox-list';
import { RangeSelector } from '@components/common/range-selector/range-selector';
import { filtersToQuery } from '@helpers/filters-to-query';
import { getValueById } from '@helpers/get-value-by-id';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import UTurnRightIcon from '@mui/icons-material/UTurnRight';
import {
  addNewBrandDetails,
  changeBrandDetails,
  resetAllFilters,
  setValue,
} from '@store/car-filter/slice';
import {
  useGetFilteredCarsQuery,
  useGetUsedOptionsQuery,
} from '@store/queries/cars';

import styles from './styles.module.scss';

const AdvancedAutoFilter: FC = () => {
  const dispatch = useAppDispatch();

  const filters = useAppSelector((state) => state.carFilter.filters);

  const brandDetails = useAppSelector((state) => state.carFilter.brandDetails);

  const [queryParams, setQueryParams] = useState<string[][]>();

  const { data: options, isLoading } = useGetUsedOptionsQuery();

  useEffect(() => {
    setQueryParams(
      filtersToQuery({
        ...filters,
        brandId: brandDetails.map((item) => item.brandId),
        modelId: brandDetails.map((item) => item.modelId),
      }),
    );
  }, [filters, brandDetails]);

  const { data: filteredCars } = useGetFilteredCarsQuery(queryParams, {
    skip: !queryParams,
  });

  // eslint-disable-next-line no-console
  console.log(filteredCars);

  const handleAddNewDetails = (): void => {
    dispatch(addNewBrandDetails());
  };

  const handleBrandDetailsChange = (data: BrandDetailsType): void => {
    dispatch(changeBrandDetails(data));
  };

  const handleRegionChange = (data: AutocompleteValueType): void => {
    const value = data?.id || '';
    dispatch(setValue({ filterName: FiltersNames.REGION_ID, value }));
  };

  const handleCheckboxListChange = (data: CheckboxListDataType): void => {
    dispatch(setValue({ filterName: data.filterName, value: data.data }));
  };

  const handleRangeChange = (range: RangeValueType[]): void => {
    range.forEach(({ filterName, value }) => {
      dispatch(setValue({ filterName, value }));
    });
  };

  const resetFilters = (): void => {
    dispatch(resetAllFilters());
  };

  const years = useMemo(() => yearsRange(30), []);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className={styles.container}>
      <h4>FILTER</h4>
      <div className={styles.row}>
        <div className={styles.column}>
          <h5 className={styles.blockTitle}>Region</h5>
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
          <CheckboxList
            title="Body Type"
            list={options && options.bodyTypes}
            checkedList={filters.bodytypeId}
            listLimit={4}
            onListCheck={handleCheckboxListChange}
            filterName={FiltersNames.BODY_TYPE_ID}
          />

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
              selectedBrandId={brandDetail.brandId}
              selectedModelId={brandDetail.modelId}
              onBrandDetailsChange={handleBrandDetailsChange}
            />
          ))}

          <h5 className={styles.blockTitle}>Year</h5>
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

          <h5 className={styles.blockTitle}>Price</h5>
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

          <h5 className={styles.blockTitle}>Race</h5>
          <div className={styles.row}>
            <RangeSelector
              list={raceRange.map((item: number) => item.toString())}
              minTitle="Km Min"
              maxTitle="Km Max"
              minFilterName={FiltersNames.RACE_START}
              maxFilterName={FiltersNames.RACE_END}
              selectedMin={filters.raceStart}
              selectedMax={filters.raceEnd}
              onChange={handleRangeChange}
            />
          </div>
          <CheckboxList
            title="Color"
            list={options && options.colors}
            checkedList={filters.colorId}
            onListCheck={handleCheckboxListChange}
            filterName={FiltersNames.COLOR_ID}
          />
          <CheckboxList
            title="Transmission"
            list={options && options.transmissionTypes}
            checkedList={filters.transmissionTypeId}
            onListCheck={handleCheckboxListChange}
            filterName={FiltersNames.TRANSMISSION_TYPE_ID}
          />
          <CheckboxList
            title="Drivetrain"
            list={options && options.drivetrains}
            checkedList={filters.drivetrainId}
            onListCheck={handleCheckboxListChange}
            filterName={FiltersNames.DRIVETRAIN_ID}
          />
          <CheckboxList
            title="Fuel"
            list={options && options.fuelTypes}
            checkedList={filters.fueltypeId}
            onListCheck={handleCheckboxListChange}
            filterName={FiltersNames.FUEL_TYPE_ID}
          />
        </div>
      </div>

      <h6 onClick={resetFilters} className={styles.reset}>
        <UTurnRightIcon className={styles.resetIcon} />
        Reset All Filters
      </h6>
    </div>
  );
};

export { AdvancedAutoFilter };
