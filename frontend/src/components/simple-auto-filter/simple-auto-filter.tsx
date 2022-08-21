import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { AutoRiaOption } from '@autoline/shared/common/types/types';
import { AppRoute } from '@common/enums/app/app-route.enum';
import { pricesRange, yearsRange } from '@common/enums/cars/ranges';
import { FiltersType } from '@common/types/cars/filters.type';
import { RangeSelector } from '@components/common/range-selector/range-selector';
import { SelectField } from '@components/common/select-field/select-field';
import {
  Autocomplete,
  MenuItem,
  SelectChangeEvent,
  SvgIcon,
  TextField,
} from '@mui/material';
import {
  useGetBrandsQuery,
  useGetFilteredCarsQuery,
  useGetModelsOfBrandQuery,
  useGetUsedOptionsQuery,
} from '@store/queries/cars';

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
    // const notEmpties = Object.fromEntries(
    //   Object.entries(params).filter(([_, value]) => value !== ''),
    // );
    //
    // const normalized = Object.entries(notEmpties).flatMap(([key, value]) => {
    //   return [[key, value]];
    // });

    setQueryParams(Object.entries(params).filter(([_, value]) => value !== ''));
  }, [filters, selectedModelId, selectedBrandId]);

  const { data: brands, isLoading } = useGetBrandsQuery();
  const { data: options, isLoading: isOptionsLoading } =
    useGetUsedOptionsQuery();

  const { data: models, isLoading: isModelsLoading } = useGetModelsOfBrandQuery(
    selectedBrandId,
    { skip: !selectedBrandId },
  );

  const { data: filteredCars } = useGetFilteredCarsQuery(queryParams, {
    skip: !queryParams,
  });

  // eslint-disable-next-line no-console
  console.log(filteredCars);

  const handleSelectChangeRegion = (
    value: { label: string; id: string } | null,
  ): void => {
    setSelectedRegion(
      value || {
        label: '',
        id: '',
      },
    );
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

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>SELECT YOUR CAR</h4>
        <Link className={styles.link} to={AppRoute.SIGN_UP}>
          Advanced Search
        </Link>
      </div>

      {options && (
        <Autocomplete
          id="regions"
          isOptionEqualToValue={(option, value): boolean =>
            option.id === value.id
          }
          disabled={isOptionsLoading}
          value={selectedRegion}
          onChange={(event, value): void => handleSelectChangeRegion(value)}
          popupIcon={
            <SvgIcon viewBox="0 0 12 8" className={styles.arrow}>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.59 0.100098L6 4.6801L1.41 0.100098L0 1.5101L6 7.5101L12 1.5101L10.59 0.100098Z"
                fill="#C9CFDD"
              />
            </SvgIcon>
          }
          options={options.regions.map((item: AutoRiaOption) => ({
            label: item.name,
            id: item.id,
          }))}
          renderInput={(params): JSX.Element => (
            <TextField {...params} label="Region" />
          )}
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
            disabled={isModelsLoading}
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
              list={yearsRange}
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
