import React, { FC, useEffect, useMemo, useState } from 'react';

import { AutoRiaOption } from '@autoline/shared/common/types/types';
import { FiltersNames } from '@common/enums/cars/filters-names.enum';
import {
  engineDisplacementRange,
  enginePowerRange,
  pricesRange,
  yearsRange,
} from '@common/enums/cars/ranges';
import { AutocompleteValueType } from '@common/types/cars/autocomplete.type';
import { BrandDetailsType } from '@common/types/cars/brand-details.type';
import { CheckboxListDataType } from '@common/types/cars/checkbox-list-data.type';
import { RangeValueType } from '@common/types/cars/range-item.type';
import { AdvancedAutoFilterProps } from '@common/types/types';
import { BrandDetails } from '@components/advanced-auto-filter/brand-details/brand-details';
import { AutocompleteInput } from '@components/common/autocomplete-input/autocomplete-input';
import { CheckboxList } from '@components/common/checkbox-list/checkbox-list';
import { RangeSelector } from '@components/common/range-selector/range-selector';
import { getValueById } from '@helpers/get-value-by-id';
import { objectToQueryString } from '@helpers/object-to-query';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import UTurnRightIcon from '@mui/icons-material/UTurnRight';
import { Button, Zoom } from '@mui/material';
import { resetAllFilters, setValue } from '@store/car-filter/slice';
import {
  useLazyGetFilteredCarsQuery,
  useGetUsedOptionsQuery,
} from '@store/queries/cars';

import styles from './styles.module.scss';

const AdvancedAutoFilter: FC<AdvancedAutoFilterProps> = (props) => {
  const { showFilteredCars } = props;
  const dispatch = useAppDispatch();

  const filters = useAppSelector((state) => state.carFilter);

  const [queryParams, setQueryParams] = useState<string[][]>();

  const initialBrandDetails = {
    id: Date.now().toString(),
    brandId: '',
    modelId: '',
  };
  const [brandDetailsList, setBrandDetailsList] = useState<BrandDetailsType[]>([
    initialBrandDetails,
  ]);

  const { data: options, isLoading } = useGetUsedOptionsQuery();

  useEffect(() => {
    setQueryParams(objectToQueryString(filters));
  }, [filters]);

  const [search, filteredCars] = useLazyGetFilteredCarsQuery();

  const doSearch = (): void => {
    search(queryParams);
  };

  useEffect(() => {
    if (filteredCars) {
      showFilteredCars(filteredCars);
    }
  }, [filteredCars]);

  const handleAddNewDetails = (): void => {
    setBrandDetailsList([
      ...brandDetailsList,
      {
        id: Date.now().toString(),
        brandId: '',
        modelId: '',
      },
    ]);
  };

  const handleBrandDetailsChange = (data: {
    id: string;
    brandId: string;
    modelId: string;
  }): void => {
    const { brandId, modelId } = data;
    setBrandDetailsList([
      ...brandDetailsList.filter((item) => item.id !== data.id),
      {
        id: data.id,
        brandId,
        modelId,
      },
    ]);
    if (!filters.brandId.includes(brandId) && brandId !== '') {
      dispatch(
        setValue({
          filterName: FiltersNames.BRAND_ID,
          value: [...filters.brandId, data.brandId],
        }),
      );
    }
    if (!filters.modelId.includes(modelId) && modelId !== '')
      dispatch(
        setValue({
          filterName: FiltersNames.MODEL_ID,
          value: [...filters.modelId, data.modelId],
        }),
      );
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
    setBrandDetailsList([initialBrandDetails]);
  };

  const isButtonVisible = Boolean(
    Object.values(filters).some((filter) => filter.length >= 1),
  );

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
              options={options.regions.map((item: AutoRiaOption) => ({
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
          {brandDetailsList
            .sort((a, b) => parseInt(a.id) - parseInt(b.id))
            .map((brandDetail) => (
              <BrandDetails
                key={brandDetail.id}
                id={brandDetail.id}
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

          <h5 className={styles.blockTitle}>Engine Power</h5>
          <div className={styles.row}>
            <RangeSelector
              list={enginePowerRange.map((item: number) => item.toString())}
              minTitle="hP Min"
              maxTitle="hP Max"
              minFilterName={FiltersNames.ENGINE_POWER_START}
              maxFilterName={FiltersNames.ENGINE_POWER_END}
              selectedMin={filters.enginePowerStart}
              selectedMax={filters.enginePowerEnd}
              onChange={handleRangeChange}
            />
          </div>
          <h5 className={styles.blockTitle}>Engine Displacement</h5>
          <div className={styles.row}>
            <RangeSelector
              list={engineDisplacementRange}
              minTitle="L Min"
              maxTitle="L Max"
              minFilterName={FiltersNames.ENGINE_DISPLACEMENT_START}
              maxFilterName={FiltersNames.ENGINE_DISPLACEMENT_END}
              selectedMin={filters.engineDisplacementStart}
              selectedMax={filters.engineDisplacementEnd}
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
      <Zoom in={isButtonVisible} unmountOnExit={true}>
        <div className={styles.searchButtonWrapper}>
          <Button
            onClick={doSearch}
            className={styles.searchButton}
            variant="contained"
          >
            SEARCH
          </Button>
        </div>
      </Zoom>
    </div>
  );
};

export { AdvancedAutoFilter };
