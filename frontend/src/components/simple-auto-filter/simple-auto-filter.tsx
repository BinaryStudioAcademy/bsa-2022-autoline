import React, { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AutoRiaOption } from '@autoline/shared/common/types/types';
import { FiltersNames } from '@common/enums/car/car-filters-names.enum';
import { pricesRange, yearsRange } from '@common/enums/car/ranges';
import { AutocompleteValueType } from '@common/types/cars/autocomplete.type';
import { RangeValueType } from '@common/types/cars/range-item.type';
import { AutocompleteInput } from '@components/common/autocomplete-input/autocomplete-input';
import { RangeSelector } from '@components/common/range-selector/range-selector';
import { SelectField } from '@components/common/select-field/select-field';
import { Spinner } from '@components/common/spinner/spinner';
import { getValueById } from '@helpers/get-value-by-id';
import { objectToQueryString } from '@helpers/object-to-query';
import { useAppDispatch, useAppSelector } from '@hooks/store/store.hooks';
import { Button, Zoom } from '@mui/material';
import { setBrandDetailsValue, setValue } from '@store/car-filter/slice';
import { setCars } from '@store/found-car/slice';
import { API } from '@store/queries/api-routes';
import {
  useGetBrandsQuery,
  useGetModelsOfBrandQuery,
  useGetUsedOptionsQuery,
  useLazyGetFilteredCarsQuery,
} from '@store/queries/cars';

import styles from './styles.module.scss';

const SimpleAutoFilter: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { filters, brandDetails } = useAppSelector((state) => state.carFilter);

  const {
    id: detailId,
    brandId,
    modelIds,
  } = useMemo(() => brandDetails[0], [brandDetails[0]]);

  const { data: brands, isLoading: isBrandsLoading } = useGetBrandsQuery();
  const { data: models } = useGetModelsOfBrandQuery(brandId, {
    skip: !brandId,
  });

  const [queryParams, setQueryParams] = useState<string[][]>();

  const { data: options, isLoading: isOptionsLoading } =
    useGetUsedOptionsQuery();

  const [search, filteredCars] = useLazyGetFilteredCarsQuery();

  useEffect(() => {
    if (filteredCars.data) {
      dispatch(setCars(filteredCars.data));
    }
  }, [filteredCars]);

  useEffect(() => {
    setQueryParams(
      objectToQueryString({
        ...filters,
        brandId: brandDetails.map((item) => item.brandId),
        modelId: brandDetails.flatMap((item) => item.modelIds),
      }),
    );
  }, [filters, brandDetails]);

  const years = useMemo(() => yearsRange(30), []);

  const handleRegionChange = (data: AutocompleteValueType): void => {
    const value = data?.id || '';
    dispatch(setValue({ filterName: FiltersNames.REGION_ID, value }));
  };

  const handleRangeChange = (range: RangeValueType[]): void => {
    range.forEach(({ filterName, value }) => {
      dispatch(setValue({ filterName, value }));
    });
  };

  const isButtonVisible = Boolean(
    Object.values(filters).some((filter) => filter.length >= 1) ||
      brandDetails[0].brandId != '' ||
      brandDetails[0].modelIds.length,
  );

  const doSearch = async (): Promise<void> => {
    await search(queryParams);
    navigate(API.SEARCH);
  };

  const brandsOptions = useMemo(
    () =>
      brands?.map(
        (item) =>
          ({
            label: item.name,
            id: item.id,
          } as AutocompleteValueType),
      ),
    [brands],
  );

  const modelsOptions = useMemo(
    () =>
      models?.map(
        (item) =>
          ({
            label: item.name,
            id: item.id,
          } as AutocompleteValueType),
      ),

    [models],
  );

  const selectedBrandName = useMemo(() => {
    return getValueById(brands || [], brandId);
  }, [brandDetails[0]]);

  const selectedModelName = useMemo(
    () => getValueById(models || [], modelIds[0]),
    [modelIds[0]],
  );

  const handleSelectBrand = (data: AutocompleteValueType): void => {
    dispatch(
      setBrandDetailsValue({
        ...data,
        id: detailId,
        brandId: data?.id || '',
        modelIds: [],
      }),
    );
  };

  const handleSelectModel = (data: AutocompleteValueType): void => {
    const newModelIds =
      modelIds.length !== 1 && data?.id ? [data?.id, ...modelIds.slice(1)] : [];
    dispatch(
      setBrandDetailsValue({
        id: detailId,
        brandId: brandDetails[0].brandId,
        modelIds: newModelIds,
      }),
    );
  };

  if (isBrandsLoading || isOptionsLoading) return <Spinner />;
  return (
    <div className={styles.container}>
      <h5 className={styles.title}>SELECT YOUR CAR</h5>

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

      <div className={styles.mainRow}>
        <div className={styles.column}>
          {brandsOptions && (
            <AutocompleteInput
              label="Brand"
              options={brandsOptions}
              value={selectedBrandName}
              onChange={handleSelectBrand}
            />
          )}
          {selectedBrandName?.id && modelsOptions ? (
            <AutocompleteInput
              label="Model"
              options={modelsOptions}
              value={selectedModelName}
              onChange={handleSelectModel}
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
            onClick={doSearch}
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
