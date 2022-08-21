import React, { FC, useEffect, useState } from 'react';

import { pricesRange, raceRange, yearsRange } from '@common/enums/cars/ranges';
import { BrandDetailsType } from '@common/types/cars/brand-details.type';
import { CheckboxListDataType } from '@common/types/cars/checkbox-list-data.type';
import { FiltersType } from '@common/types/cars/filters.type';
import { BrandDetails } from '@components/advanced-auto-filter/brand-details/brand-details';
import { CheckboxList } from '@components/common/checkbox-list/checkbox-list';
import { RangeSelector } from '@components/common/range-selector/range-selector';
import { toCamelCase } from '@helpers/strings';
import {
  useGetFilteredCarsQuery,
  useGetUsedOptionsQuery,
} from '@store/queries/cars';

import styles from './styles.module.scss';

const AdvancedAutoFilter: FC = (): JSX.Element => {
  const [queryParams, setQueryParams] = useState<string[][]>();

  const [brandDetails, setBrandDetails] = useState<BrandDetailsType[]>([
    {
      id: Date.now().toString(),
      brandId: '',
      modelId: '',
    },
  ]);
  const [filters, setFilters] = useState<FiltersType>({
    region: '',
    yearMin: '',
    yearMax: '',
    $Min: '',
    $Max: '',
    kmMin: '',
    kmMax: '',
    color: [],
    drivetrain: [],
    fuelType: [],
    bodyType: [],
    transmission: [],
  });

  const { data: options, isLoading } = useGetUsedOptionsQuery();
  const { data: filteredCars } = useGetFilteredCarsQuery(queryParams);

  // eslint-disable-next-line no-console
  console.log(filteredCars);

  useEffect(() => {
    const params = {
      bodytypeId: filters.bodyType,
      brandId: brandDetails.map((detail) => detail.brandId),
      modelId: brandDetails.map((detail) => detail.modelId),
      yearStart: filters.yearMin,
      yearEnd: filters.yearMax,
      priceStart: filters.$Min,
      priceEnd: filters.$Max,
      regionId: filters.region,
      colorId: filters.color,
      raceStart: filters.kmMin,
      raceEnd: filters.kmMax,
      transmissionTypeId: filters.transmission,
      fueltypeId: filters.fuelType,
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
  }, [filters, brandDetails]);

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

  const handleRangeChange = (range: { [p: number]: string }): void => {
    setFilters({
      ...filters,
      ...range,
    });
  };

  const handleCheckboxListChange = (data: CheckboxListDataType): void => {
    setFilters({
      ...filters,
      [toCamelCase(data.title)]: data.data,
    });
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className={styles.container}>
      <h1>FILTER</h1>
      <div className={styles.row}>
        <div className={styles.column}>
          <CheckboxList
            title="Body Type"
            list={options && options.bodyTypes}
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

          <h4>Year</h4>
          <div className={styles.row}>
            <RangeSelector
              list={yearsRange}
              minTitle="Year Min"
              maxTitle="Year Max"
              selectedMin={filters.yearMin}
              selectedMax={filters.yearMax}
              onChange={handleRangeChange}
            />
          </div>

          <h4>Price</h4>
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

          <h4>Race</h4>
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
            onListCheck={handleCheckboxListChange}
          />
          <CheckboxList
            title="Transmission"
            list={options && options.transmissionTypes}
            onListCheck={handleCheckboxListChange}
          />
          <CheckboxList
            title="Drivetrain"
            list={options && options.drivetrains}
            onListCheck={handleCheckboxListChange}
          />
          <CheckboxList
            title="Fuel"
            list={options && options.fuelTypes}
            onListCheck={handleCheckboxListChange}
          />
        </div>
      </div>
    </div>
  );
};

export { AdvancedAutoFilter };
