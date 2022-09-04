import React, { FC } from 'react';

import { AutocompleteValueType } from '@common/types/cars/autocomplete.type';
import { BrandDetailsType } from '@common/types/cars/brand-details.type';
import { CheckboxListDataType } from '@common/types/cars/checkbox-list-data.type';
import { AutocompleteInput } from '@components/common/autocomplete-input/autocomplete-input';
import { MultiselectInput } from '@components/common/multiselect-input/multiselect-input';
import { SelectField } from '@components/common/select-field/select-field';
import { Spinner } from '@components/common/spinner/spinner';
import { getValueById } from '@helpers/get-value-by-id';
import { useAppSelector } from '@hooks/store/store.hooks';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Box, IconButton } from '@mui/material';
import {
  useGetBrandsQuery,
  useGetModelsOfBrandQuery,
} from '@store/queries/cars';

import styles from './styles.module.scss';

type Props = {
  id: string;
  onBrandDetailsChange: (data: BrandDetailsType) => void;
  onBrandDetailsRemove?: () => void;
};

const BrandDetails: FC<Props> = ({
  id,
  onBrandDetailsChange,
  onBrandDetailsRemove,
}) => {
  const { brandDetails } = useAppSelector((state) => state.carFilter);
  const { brandId, modelIds } = brandDetails.find(
    (item) => item.id === id,
  ) as BrandDetailsType;

  const { data: brands, isLoading } = useGetBrandsQuery();
  const { data: models } = useGetModelsOfBrandQuery(brandId, {
    skip: !brandId,
  });

  const selectedBrandName = getValueById(brands || [], brandId);
  const selectedModelNames = modelIds.map((id: string) =>
    getValueById(models || [], id),
  );

  const handleSelectBrand = (data: AutocompleteValueType): void => {
    onBrandDetailsChange({
      id,
      brandId: data?.id || '',
      modelIds: [],
    });
  };

  const handleSelectModel = (data: CheckboxListDataType): void => {
    onBrandDetailsChange({
      id,
      brandId,
      modelIds: data.list || [],
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <div>
      {brandDetails.length > 1 && (
        <Box display="flex" justifyContent="right">
          <IconButton
            onClick={onBrandDetailsRemove}
            className={styles.deleteButton}
            aria-label="delete"
          >
            <CloseOutlinedIcon className={styles.deleteIcon} />
          </IconButton>
        </Box>
      )}
      {brands && (
        <AutocompleteInput
          label="Brand"
          onChange={handleSelectBrand}
          value={selectedBrandName}
          options={brands.map((item) => ({
            label: item.name,
            id: item.id,
          }))}
        />
      )}
      {models ? (
        <MultiselectInput
          label="Model"
          options={models.map((item) => ({
            label: item.name,
            id: item.id,
          }))}
          value={selectedModelNames}
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
  );
};

export { BrandDetails };
