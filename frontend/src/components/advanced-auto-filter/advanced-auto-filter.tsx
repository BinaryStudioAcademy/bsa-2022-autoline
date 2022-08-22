import React, { FC, useEffect, useMemo, useState } from 'react';

import { AutoRiaOption } from '@autoline/shared/common/types/types';
import { pricesRange, raceRange, yearsRange } from '@common/enums/cars/ranges';
import { BrandDetailsType } from '@common/types/cars/brand-details.type';
import { CheckboxListDataType } from '@common/types/cars/checkbox-list-data.type';
import { FiltersType } from '@common/types/cars/filters.type';
import { BrandDetails } from '@components/advanced-auto-filter/brand-details/brand-details';
import { AutocompleteInput } from '@components/common/autocomplete-input/autocomplete-input';
import { CheckboxList } from '@components/common/checkbox-list/checkbox-list';
import { RangeSelector } from '@components/common/range-selector/range-selector';
import { toCamelCase } from '@helpers/strings';
import UTurnRightIcon from '@mui/icons-material/UTurnRight';
import {
  useGetFilteredCarsQuery,
  useGetUsedOptionsQuery,
} from '@store/queries/cars';

import { AutocompleteDataType } from '../../types/autocomplete.type';
import styles from './styles.module.scss';

const AdvancedAutoFilter: FC = (): JSX.Element => {
  const [queryParams, setQueryParams] = useState<string[][]>();

  const [selectedRegion, setSelectedRegion] = useState({
    label: '',
    id: '',
  });
  const [brandDetails, setBrandDetails] = useState<BrandDetailsType[]>([
    {
      id: Date.now().toString(),
      brandId: '',
      modelId: '',
    },
  ]);

  const initialFiltersState = {
    yearMin: '',
    yearMax: '',
    $Min: '',
    $Max: '',
    kmMin: '',
    kmMax: '',
    color: [],
    drivetrain: [],
    fuel: [],
    bodyType: [],
    transmission: [],
  };
  const [filters, setFilters] = useState<FiltersType>(initialFiltersState);

  const { data: options, isLoading } = useGetUsedOptionsQuery();
  const { data: filteredCars } = useGetFilteredCarsQuery(queryParams);

  // eslint-disable-next-line no-console
  console.log(filteredCars);

  useEffect(() => {
    const params = {
      regionId: selectedRegion.id,
      bodytypeId: filters.bodyType,
      brandId: brandDetails.map((detail) => detail.brandId),
      modelId: brandDetails.map((detail) => detail.modelId),
      yearStart: filters.yearMin,
      yearEnd: filters.yearMax,
      priceStart: filters.$Min,
      priceEnd: filters.$Max,
      colorId: filters.color,
      raceStart: filters.kmMin,
      raceEnd: filters.kmMax,
      transmissionTypeId: filters.transmission,
      fueltypeId: filters.fuel,
      drivetrainId: filters.drivetrain,
    };
    const notEmpties = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value.length >= 1 && value !== '' && value[0] !== '',
      ),
    );

    const normalized = Object.entries(notEmpties).flatMap(([key, value]) => {
      if (typeof value === 'string') {
        return [[key, value]];
      }
      return value.map((item) => [key, item]);
    });

    setQueryParams(normalized);
  }, [filters, brandDetails, selectedRegion]);

  const handleAddNewDetails = (): void => {
    setBrandDetails([
      ...brandDetails,
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
    setBrandDetails([
      ...brandDetails.filter((item) => item.id !== data.id),
      {
        id: data.id,
        brandId: data.brandId,
        modelId: data.modelId,
      },
    ]);
  };

  const handleAutocompleteInputChange = (data: AutocompleteDataType): void => {
    setSelectedRegion(data.value || { label: '', id: '' });
  };

  const handleRangeChange = (range: { [p: number]: string }): void => {
    setFilters({
      ...filters,
      ...range,
    });
  };

  const years = useMemo(() => yearsRange(30), []);

  const handleCheckboxListChange = (data: CheckboxListDataType): void => {
    setFilters({
      ...filters,
      [toCamelCase(data.title)]: data.data,
    });
  };

  const resetFilters = (): void => {
    setSelectedRegion({ label: '', id: '' });
    setBrandDetails([]);
    setFilters(initialFiltersState);
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className={styles.container}>
      <h1>FILTER</h1>
      <div className={styles.row}>
        <div className={styles.column}>
          <h4 className={styles.blockTitle}>Region</h4>
          {options && (
            <AutocompleteInput
              label="Regions"
              onChange={handleAutocompleteInputChange}
              value={selectedRegion}
              options={options?.regions?.map((item: AutoRiaOption) => ({
                label: item.name,
                id: item.id,
              }))}
            />
          )}

          <CheckboxList
            title="Body Type"
            list={options && options.bodyTypes}
            checkedList={filters.bodyType}
            listLimit={4}
            onListCheck={handleCheckboxListChange}
          />

          <div className={styles.row}>
            <h4 className={styles.blockTitle}>Brand Details</h4>
            <p className={styles.addButton} onClick={handleAddNewDetails}>
              + Add
            </p>
          </div>
          {brandDetails.map((brandDetail) => (
            <BrandDetails
              key={brandDetail.id}
              id={brandDetail.id}
              onBrandDetailsChange={handleBrandDetailsChange}
            />
          ))}

          <h4 className={styles.blockTitle}>Year</h4>
          <div className={styles.row}>
            <RangeSelector
              list={years}
              minTitle="Year Min"
              maxTitle="Year Max"
              selectedMin={filters.yearMin}
              selectedMax={filters.yearMax}
              onChange={handleRangeChange}
            />
          </div>

          <h4 className={styles.blockTitle}>Price</h4>
          <div className={styles.row}>
            <RangeSelector
              list={pricesRange.map((item: number) => item.toString())}
              minTitle="$ Min"
              maxTitle="$ Max"
              selectedMin={filters.$Min}
              selectedMax={filters.$Max}
              onChange={handleRangeChange}
            />
          </div>

          <h4 className={styles.blockTitle}>Race</h4>
          <div className={styles.row}>
            <RangeSelector
              list={raceRange.map((item: number) => item.toString())}
              minTitle="Km Min"
              maxTitle="Km Max"
              selectedMin={filters.kmMin}
              selectedMax={filters.kmMax}
              onChange={handleRangeChange}
            />
          </div>
          <CheckboxList
            title="Color"
            list={options && options.colors}
            checkedList={filters.color}
            onListCheck={handleCheckboxListChange}
          />
          <CheckboxList
            title="Transmission"
            list={options && options.transmissionTypes}
            checkedList={filters.transmission}
            onListCheck={handleCheckboxListChange}
          />
          <CheckboxList
            title="Drivetrain"
            list={options && options.drivetrains}
            checkedList={filters.drivetrain}
            onListCheck={handleCheckboxListChange}
          />
          <CheckboxList
            title="Fuel"
            list={options && options.fuelTypes}
            checkedList={filters.fuel}
            onListCheck={handleCheckboxListChange}
          />
        </div>
      </div>

      <p onClick={resetFilters} className={styles.reset}>
        <UTurnRightIcon className={styles.resetIcon} />
        Reset All Filters
      </p>
    </div>
  );
};

export { AdvancedAutoFilter };
