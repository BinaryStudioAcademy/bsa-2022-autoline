import React, { FC, useEffect, useMemo, useState } from 'react';

import { AutoRiaOption } from '@autoline/shared/common/types/types';
import {
  CheckListsNames,
  RangeNames,
  RangeValueNames,
} from '@common/enums/cars/filter-names.enum';
import { pricesRange, raceRange, yearsRange } from '@common/enums/cars/ranges';
import { AutocompleteValueType } from '@common/types/car-filter/autocomplete.type';
import { BrandDetailsType } from '@common/types/car-filter/brand-details.type';
import { CheckboxListDataType } from '@common/types/car-filter/checkbox-list-data.type';
import { RangeValueType } from '@common/types/car-filter/range-value.type';
import { BrandDetails } from '@components/advanced-auto-filter/brand-details/brand-details';
import { AutocompleteInput } from '@components/common/autocomplete-input/autocomplete-input';
import { CheckboxList } from '@components/common/checkbox-list/checkbox-list';
import { RangeSelector } from '@components/common/range-selector/range-selector';
import { rangeFiltersToObject } from '@helpers/car-filter/range-filters-to-object';
import { filtersToQuery } from '@helpers/filters-to-query';
import { getValueById } from '@helpers/get-value-by-id';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import UTurnRightIcon from '@mui/icons-material/UTurnRight';
import {
  addNewBrandDetails,
  resetAllFilters,
  setBrandDetailsValue,
  setCheckListValue,
  setRangeValue,
} from '@store/car-filter/slice';
import {
  useGetFilteredCarsQuery,
  useGetUsedOptionsQuery,
} from '@store/queries/cars';

import styles from './styles.module.scss';

const AdvancedAutoFilter: FC = () => {
  const dispatch = useAppDispatch();

  const { rangeFilters, checkLists, brandDetails } = useAppSelector(
    (state) => state.carFilter,
  );

  const [queryParams, setQueryParams] = useState<string[][]>();

  const { data: options, isLoading } = useGetUsedOptionsQuery();

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

  const { data: filteredCars } = useGetFilteredCarsQuery(queryParams, {
    skip: !queryParams,
  });

  // eslint-disable-next-line no-console
  console.log(filteredCars);

  const handleAddNewDetails = (): void => {
    dispatch(addNewBrandDetails());
  };

  const handleBrandDetailsChange = (data: BrandDetailsType): void => {
    dispatch(setBrandDetailsValue(data));
  };

  const handleRegionChange = (data: AutocompleteValueType): void => {
    const value = data?.id || '';
    dispatch(
      setCheckListValue({
        filterName: CheckListsNames.REGION_ID,
        value: [value],
      }),
    );
  };

  const handleCheckboxListChange = (data: CheckboxListDataType): void => {
    dispatch(
      setCheckListValue({ filterName: data.filterName, value: data.data }),
    );
  };

  const handleRangeChange = (range: RangeValueType): void => {
    dispatch(setRangeValue(range));
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
              value={getValueById(options.regions, checkLists.regionId[0])}
              options={options?.regions?.map((item: AutoRiaOption) => ({
                label: item.name,
                id: item.id,
              }))}
            />
          )}
          <CheckboxList
            title="Body Type"
            list={options && options.bodyTypes}
            checkedList={checkLists.bodytypeId}
            listLimit={4}
            onListCheck={handleCheckboxListChange}
            filterName={CheckListsNames.BODY_TYPE_ID}
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
              rangeName={RangeNames.YEAR}
              selectedMin={rangeFilters.year.yearStart}
              selectedMax={rangeFilters.year.yearEnd}
              onChange={handleRangeChange}
              minFilterName={RangeValueNames.YEAR_START}
              maxFilterName={RangeValueNames.YEAR_END}
            />
          </div>

          <h5 className={styles.blockTitle}>Price</h5>
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

          <h5 className={styles.blockTitle}>Race</h5>
          <div className={styles.row}>
            <RangeSelector
              list={raceRange.map((item: number) => item.toString())}
              minTitle="Km Min"
              maxTitle="Km Max"
              rangeName={RangeNames.RACE}
              minFilterName={RangeValueNames.RACE_START}
              maxFilterName={RangeValueNames.RACE_END}
              selectedMin={rangeFilters.race.raceStart}
              selectedMax={rangeFilters.race.raceEnd}
              onChange={handleRangeChange}
            />
          </div>
          <CheckboxList
            title="Color"
            list={options && options.colors}
            checkedList={checkLists.colorId}
            onListCheck={handleCheckboxListChange}
            filterName={CheckListsNames.COLOR_ID}
          />
          <CheckboxList
            title="Transmission"
            list={options && options.transmissionTypes}
            checkedList={checkLists.transmissionTypeId}
            onListCheck={handleCheckboxListChange}
            filterName={CheckListsNames.TRANSMISSION_TYPE_ID}
          />
          <CheckboxList
            title="Drivetrain"
            list={options && options.drivetrains}
            checkedList={checkLists.drivetrainId}
            onListCheck={handleCheckboxListChange}
            filterName={CheckListsNames.DRIVETRAIN_ID}
          />
          <CheckboxList
            title="Fuel"
            list={options && options.fuelTypes}
            checkedList={checkLists.fueltypeId}
            onListCheck={handleCheckboxListChange}
            filterName={CheckListsNames.FUEL_TYPE_ID}
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
