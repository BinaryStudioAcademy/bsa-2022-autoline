import React, { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AutoRiaOption } from '@autoline/shared/common/types/types';
import {
  CheckListsNames,
  RangeNames,
  RangeValueNames,
} from '@common/enums/car/car-filters-names.enum';
import { pricesRange, yearsRange } from '@common/enums/car/ranges';
import { AutocompleteValueType } from '@common/types/cars/autocomplete.type';
import { RangeValueType } from '@common/types/cars/range-item.type';
import { AutocompleteInput } from '@components/common/autocomplete-input/autocomplete-input';
import { RangeSelector } from '@components/common/range-selector/range-selector';
import { SelectField } from '@components/common/select-field/select-field';
import { Spinner } from '@components/common/spinner/spinner';
import { isFiltersEmpty } from '@helpers/car-filters/is-filters-empty';
import { rangeFiltersToObject } from '@helpers/car-filters/range-filters-to-object';
import { getValueById } from '@helpers/get-value-by-id';
import { useAppDispatch, useAppSelector } from '@hooks/store/store.hooks';
import { Button, Zoom } from '@mui/material';
import {
  setBrandDetailsValue,
  setCheckListValue,
  setRangeValue,
} from '@store/car-filter/slice';
import { setModels } from '@store/car-models/slice';
import { setCars } from '@store/found-car/slice';
import { API } from '@store/queries/api-routes';
import {
  useGetBrandsQuery,
  useGetModelsOfBrandQuery,
  useGetUsedOptionsQuery,
  useLazyGetFilteredCarsQuery,
} from '@store/queries/cars';
import { useCreateRecentSearchCarsMutation } from '@store/queries/recent-serach-cars';
import { selectFiltersQueryArr } from '@store/selectors/car-filter-selectors';

import styles from './styles.module.scss';

const SimpleAutoFilter: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { rangeFilters, checkLists, brandDetails } = useAppSelector(
    (state) => state.carFilter,
  );

  const { id: detailId, brandId, modelIds } = brandDetails[0];

  const { data: brands, isLoading: isBrandsLoading } = useGetBrandsQuery();
  const { data: models } = useGetModelsOfBrandQuery(brandId, {
    skip: !brandId,
  });

  useEffect(() => {
    models && dispatch(setModels(models));
  }, [models]);

  const [queryParams, setQueryParams] = useState<string[][]>();

  const { data: options, isLoading: isOptionsLoading } =
    useGetUsedOptionsQuery();

  const [search, filteredCars] = useLazyGetFilteredCarsQuery();

  const [addRecentSearchCar] = useCreateRecentSearchCarsMutation();

  useEffect(() => {
    if (filteredCars.data) {
      dispatch(setCars(filteredCars.data));
    }
  }, [filteredCars]);

  const filtersArr = useAppSelector(selectFiltersQueryArr);

  useEffect(() => {
    setQueryParams(filtersArr);
  }, [rangeFilters, checkLists, brandDetails]);

  const years = useMemo(() => yearsRange(30), []);

  const handleRegionChange = (data: AutocompleteValueType): void => {
    const value = [data?.id || ''];
    dispatch(
      setCheckListValue({
        filterName: CheckListsNames.REGION_ID,
        value,
      }),
    );
  };

  const handleRangeChange = (range: RangeValueType): void => {
    dispatch(setRangeValue(range));
  };

  const isFiltersApplied = Boolean(
    !isFiltersEmpty({ ...rangeFiltersToObject(rangeFilters), ...checkLists }) ||
      brandDetails.some((detail) => detail.brandId !== ''),
  );

  const doSearch = async (): Promise<void> => {
    const { data: cars } = await search(queryParams);
    if (cars) {
      addRecentSearchCar(cars[0]?.model_id);
    }
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
  }, [brandId]);

  const selectedModelName = useMemo(
    () => getValueById(models || [], modelIds[0]),
    [modelIds],
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
    const newModelIds = data?.id ? [data?.id] : [];
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
          value={getValueById(options.regions, checkLists.regionId[0])}
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
            <SelectField name="Model" value="" disabled required={false}>
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
              rangeName={RangeNames.YEAR}
              minFilterName={RangeValueNames.YEAR_START}
              maxFilterName={RangeValueNames.YEAR_END}
              selectedMin={rangeFilters.year.yearStart}
              selectedMax={rangeFilters.year.yearEnd}
              onChange={handleRangeChange}
            />
          </div>
          <div className={styles.row}></div>
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
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Zoom in={isFiltersApplied}>
          <Button
            onClick={doSearch}
            disabled={!isFiltersApplied}
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
