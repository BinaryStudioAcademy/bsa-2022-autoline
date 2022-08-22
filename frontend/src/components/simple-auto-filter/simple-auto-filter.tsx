import React, { FC, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { AutoRiaOption } from '@autoline/shared/common/types/types';
import { AppRoute } from '@common/enums/app/app-route.enum';
import { pricesRange, yearsRange } from '@common/enums/cars/ranges';
import { FiltersType } from '@common/types/cars/filters.type';
import { AutocompleteInput } from '@components/common/autocomplete-input/autocomplete-input';
import { RangeSelector } from '@components/common/range-selector/range-selector';
import { SelectField } from '@components/common/select-field/select-field';
import { MenuItem, SelectChangeEvent } from '@mui/material';
import {
  useGetBrandsQuery,
  useGetFilteredCarsQuery,
  useGetModelsOfBrandQuery,
  useGetUsedOptionsQuery,
} from '@store/queries/cars';

import { AutocompleteDataType } from '../../types/autocomplete.type';
import styles from './styles.module.scss';

const SimpleAutoFilter: FC = () => {
  const [selectedBrandId, setSelectedBrandId] = useState('');
  const [selectedModelId, setSelectedModelId] = useState('');
  const [selectedRegion, setSelectedRegion] = useState({
    label: '',
    id: '',
  });

  const [queryParams, setQueryParams] = useState<string[][]>([]);

  const [filters, setFilters] = useState<Partial<FiltersType>>({
    yearMin: '',
    yearMax: '',
    $Min: '',
    $Max: '',
  });

  useEffect(() => {
    const params = {
      brandId: selectedBrandId,
      modelId: selectedModelId,
      regionId: selectedRegion.id,
      yearStart: filters.yearMin || '',
      yearEnd: filters.yearMax || '',
      priceStart: filters.$Min || '',
      priceEnd: filters.$Max || '',
    };

    setQueryParams(Object.entries(params).filter(([_, value]) => value !== ''));
  }, [filters, selectedModelId, selectedBrandId, selectedRegion]);

  const { data: brands, isLoading } = useGetBrandsQuery();
  const { data: options, isLoading: isOptionsLoading } =
    useGetUsedOptionsQuery();

  const { data: models } = useGetModelsOfBrandQuery(selectedBrandId, {
    skip: !selectedBrandId,
  });

  const years = useMemo(() => yearsRange(30), []);

  const { data: filteredCars } = useGetFilteredCarsQuery(queryParams, {
    skip: !queryParams,
  });

  // eslint-disable-next-line no-console
  console.log(filteredCars);

  const handleAutocompleteInputChange = (data: AutocompleteDataType): void => {
    setSelectedRegion(data.value || { label: '', id: '' });
  };

  const handleSelectChangeBrand = (event: SelectChangeEvent): void => {
    setSelectedBrandId(event.target.value);
    setSelectedModelId('');
  };

  const handleSelectChangeModel = (event: SelectChangeEvent): void => {
    setSelectedModelId(event.target.value);
  };

  const handleRangeChange = (range: { [p: number]: string }): void => {
    setFilters({
      ...filters,
      ...range,
    });
  };

  if (isLoading || isOptionsLoading) return <h1>Loading...</h1>;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>SELECT YOUR CAR</h4>
        <Link className={styles.link} to={AppRoute.SIGN_UP}>
          Advanced Search
        </Link>
      </div>

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

      <div className={styles.mainRow}>
        <div className={styles.column}>
          <SelectField
            id="brand"
            name="Brand"
            value={selectedBrandId}
            onChange={handleSelectChangeBrand}
            required={false}
          >
            {brands &&
              brands.map((brand) => (
                <MenuItem key={brand.id} value={brand.id}>
                  {brand.name}
                </MenuItem>
              ))}
          </SelectField>
          <SelectField
            id="model"
            name="Model"
            value={selectedModelId}
            onChange={handleSelectChangeModel}
            required={false}
          >
            {models &&
              models.map((model) => (
                <MenuItem key={model.id} value={model.id}>
                  {model.name}
                </MenuItem>
              ))}
          </SelectField>
        </div>
        <div className={styles.column}>
          <div className={styles.row}>
            <RangeSelector
              list={years}
              minTitle="Year Min"
              maxTitle="Year Max"
              selectedMin={filters.yearMin || ''}
              selectedMax={filters.yearMax || ''}
              onChange={handleRangeChange}
            />
          </div>
          <div className={styles.row}></div>
          <div className={styles.row}>
            <RangeSelector
              list={pricesRange.map((item) => item.toString())}
              minTitle="$ Min"
              maxTitle="$ Max"
              selectedMin={filters.$Min || ''}
              selectedMax={filters.$Max || ''}
              onChange={handleRangeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { SimpleAutoFilter };
