import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

import { AutoRiaOption } from '@autoline/shared/common/types/types';
import {
  CheckListsNames,
  FiltersNames,
} from '@common/enums/car/car-filters-names.enum';
import {
  engineDisplacementRange,
  enginePowerRange,
  pricesRange,
  yearsRange,
} from '@common/enums/car/ranges';
import { AutocompleteValueType } from '@common/types/cars/autocomplete.type';
import { BrandDetailsType } from '@common/types/cars/brand-details.type';
import { CheckboxListDataType } from '@common/types/cars/checkbox-list-data.type';
import { RangeValueType } from '@common/types/cars/range-item.type';
import { BrandDetails } from '@components/advanced-auto-filter/brand-details/brand-details';
import { AutocompleteInput } from '@components/common/autocomplete-input/autocomplete-input';
import { CheckboxList } from '@components/common/checkbox-list/checkbox-list';
import { MultiselectInput } from '@components/common/multiselect-input/multiselect-input';
import { RangeSelector } from '@components/common/range-selector/range-selector';
import { Spinner } from '@components/common/spinner/spinner';
import { isFiltersEmpty } from '@helpers/car-filters/is-filters-empty';
import { getValueById } from '@helpers/get-value-by-id';
import { objectToQueryString } from '@helpers/object-to-query';
import { getElementHeightWithMargins } from '@helpers/utils/get-element-height-with-margins';
import { getHeightByPosition } from '@helpers/utils/get-height-by-position';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import UTurnRightIcon from '@mui/icons-material/UTurnRight';
import { Button, Zoom } from '@mui/material';
import {
  addNewBrandDetails,
  removeBrandDetails,
  resetAllFilters,
  setBrandDetailsValue,
  setCheckListValue,
  setValue,
} from '@store/car-filter/slice';
import { setCars } from '@store/found-car/slice';
import {
  useGetUsedOptionsQuery,
  useLazyGetFilteredCarsQuery,
} from '@store/queries/cars';
import { useCreateRecentSearchCarsMutation } from '@store/queries/recent-serach-cars';
import {
  selectNormalizedOptionsInAutocompleteType,
  selectOptionsInAutocompleteType,
} from '@store/selectors/car-filter-selectors';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

const AdvancedAutoFilter: FC = () => {
  const dispatch = useAppDispatch();

  const { filters, checkLists, brandDetails } = useAppSelector(
    (state) => state.carFilter,
  );

  const [queryParams, setQueryParams] = useState<string[][]>();

  const { data: options, isLoading } = useGetUsedOptionsQuery();

  const [search, filteredCars] = useLazyGetFilteredCarsQuery();

  const [addRecentSearchCar] = useCreateRecentSearchCarsMutation();
  const doSearch = async (): Promise<void> => {
    const { data } = await search(queryParams);
    if (data) {
      addRecentSearchCar(data[0]?.model_id);
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const [filterContainer, setFilterContainerRef] =
    useState<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!filterContainer) return;

    const headerHeight =
      document.querySelector('#mainHeader')?.clientHeight || 0;

    const searchTitleHeight = getElementHeightWithMargins(
      document.querySelector('#searchTitle'),
    );

    const formTop = headerHeight + searchTitleHeight;

    filterContainer.style.height = `${getHeightByPosition(formTop)}px`;

    const handleScroll = (): void => {
      filterContainer.style.height = `${getHeightByPosition(formTop)}px`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [filterContainer]);

  useEffect(() => {
    setQueryParams(
      objectToQueryString({
        ...filters,
        ...checkLists,
        brandId: brandDetails.map((item) => item.brandId),
        modelId: brandDetails.flatMap((item) => item.modelIds),
      }),
    );

    if (
      isFiltersEmpty({ ...filters, ...checkLists }) &&
      brandDetails.every((detail) => detail.brandId === '')
    ) {
      search([], true);
    }
  }, [filters, checkLists, brandDetails]);

  useEffect(() => {
    if (filteredCars.data) {
      dispatch(setCars(filteredCars.data));
    }
  }, [filteredCars]);

  const handleAddNewDetails = (): void => {
    dispatch(addNewBrandDetails());
  };

  const handleBrandDetailsChange = (data: BrandDetailsType): void => {
    dispatch(setBrandDetailsValue(data));
  };

  const handleBrandDetailsRemove = (id: string): void => {
    dispatch(removeBrandDetails(id));
  };

  const handleRegionChange = (data: AutocompleteValueType): void => {
    const value = data?.id || '';
    dispatch(setValue({ filterName: FiltersNames.REGION_ID, value }));
  };

  const handleCheckboxListChange = useCallback(
    (data: CheckboxListDataType) => {
      const filterName = data.filterName as CheckListsNames;
      dispatch(setCheckListValue({ filterName, value: data.list }));
    },
    [dispatch],
  );

  const handleRangeChange = (range: RangeValueType[]): void => {
    range.forEach(({ filterName, value }) => {
      dispatch(setValue({ filterName, value }));
    });
  };

  const resetFilters = (): void => {
    dispatch(resetAllFilters());
  };

  const isFiltersApplied = Boolean(
    !isFiltersEmpty({ ...filters, ...checkLists }) ||
      brandDetails.some((detail) => detail.brandId !== ''),
  );

  const years = useMemo(() => yearsRange(30), []);

  const optionsInAutocompleteForm = useAppSelector(
    selectOptionsInAutocompleteType,
  );

  const normalizedOptions = useAppSelector(
    selectNormalizedOptionsInAutocompleteType,
  );

  const memoizedCheckListValues = useMemo(() => {
    if (!normalizedOptions) return;
    return Object.fromEntries(
      Object.entries(checkLists).map(([key, value]) => [
        key,
        value.map((id) => normalizedOptions[id]),
      ]),
    );
  }, [checkLists, normalizedOptions]);

  if (isLoading) return <Spinner />;

  return (
    <div ref={setFilterContainerRef} className={styles.container}>
      <h4>FILTER</h4>
      <div className={clsx(styles.column, 'styledScrollbar')}>
        <h5 className={styles.blockTitle}>Body Type</h5>
        {optionsInAutocompleteForm && memoizedCheckListValues && (
          <MultiselectInput
            label="Body Type"
            filterName={CheckListsNames.BODY_TYPE_ID}
            options={optionsInAutocompleteForm.bodyTypes}
            values={memoizedCheckListValues.bodyTypeId}
            onChange={handleCheckboxListChange}
          />
        )}
        <div className={styles.row}>
          <h5 className={styles.blockTitle}>Brand Details</h5>
          <Button
            onClick={handleAddNewDetails}
            className={styles.addButton}
            aria-label="Add"
          >
            <AddOutlinedIcon />
            Add
          </Button>
        </div>
        {brandDetails.map((brandDetail) => (
          <BrandDetails
            key={brandDetail.id}
            id={brandDetail.id}
            brandId={brandDetail.brandId}
            modelIds={brandDetail.modelIds}
            onBrandDetailsChange={handleBrandDetailsChange}
            onBrandDetailsRemove={(): void =>
              handleBrandDetailsRemove(brandDetail.id)
            }
          />
        ))}

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
        <h5 className={styles.blockTitle}>Color</h5>
        {optionsInAutocompleteForm && memoizedCheckListValues && (
          <MultiselectInput
            label="Color"
            filterName={CheckListsNames.COLOR_ID}
            options={optionsInAutocompleteForm.colors}
            values={memoizedCheckListValues.colorId}
            onChange={handleCheckboxListChange}
          />
        )}
        <h5 className={styles.blockTitle}>Fuel</h5>
        {optionsInAutocompleteForm && memoizedCheckListValues && (
          <MultiselectInput
            label="Fuel"
            filterName={CheckListsNames.FUEL_TYPE_ID}
            options={optionsInAutocompleteForm.fuelTypes}
            values={memoizedCheckListValues.fuelTypeId}
            onChange={handleCheckboxListChange}
          />
        )}
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
      </div>
      <Zoom in={isFiltersApplied} unmountOnExit={true}>
        <div className={styles.bottomControls}>
          <Button
            onClick={resetFilters}
            className={styles.reset}
            aria-label="delete"
          >
            <UTurnRightIcon className={styles.resetIcon} />
            Reset All Filters
          </Button>
          <div className={styles.searchButtonWrapper}>
            <Button
              onClick={doSearch}
              className={styles.searchButton}
              variant="contained"
            >
              SEARCH
            </Button>
          </div>
        </div>
      </Zoom>
    </div>
  );
};

export { AdvancedAutoFilter };
