import React, { FC } from 'react';

import { AutocompleteValueType } from '@common/types/cars/autocomplete.type';
import { BrandDetailsType } from '@common/types/cars/brand-details.type';
import { AutocompleteInput } from '@components/common/autocomplete-input/autocomplete-input';
import { SelectField } from '@components/common/select-field/select-field';
import { Spinner } from '@components/common/spinner/spinner';
import { getValueById } from '@helpers/get-value-by-id';
import {
  useGetBrandsQuery,
  useGetModelsOfBrandQuery,
} from '@store/queries/cars';

type Props = {
  onBrandDetailsChange: (data: BrandDetailsType) => void;
  id: string;
  selectedBrandId: string;
  selectedModelId: string;
};

const BrandDetails: FC<Props> = ({
  onBrandDetailsChange,
  id,
  selectedBrandId,
  selectedModelId,
}) => {
  const { data: brands, isLoading } = useGetBrandsQuery();
  const { data: models } = useGetModelsOfBrandQuery(selectedBrandId, {
    skip: !selectedBrandId,
  });

  const selectedBrandName = getValueById(brands || [], selectedBrandId);
  const selectedModelName = getValueById(models || [], selectedModelId);

  const handleSelectBrand = (data: AutocompleteValueType): void => {
    onBrandDetailsChange({
      id,
      brandId: data?.id || '',
      modelId: '',
    });
  };

  const handleSelectModel = (data: AutocompleteValueType): void => {
    onBrandDetailsChange({
      id,
      brandId: selectedBrandId,
      modelId: data?.id || '',
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <div>
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
        <AutocompleteInput
          label="Model"
          onChange={handleSelectModel}
          value={selectedModelName}
          options={models.map((item) => ({
            label: item.name,
            id: item.id,
          }))}
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
