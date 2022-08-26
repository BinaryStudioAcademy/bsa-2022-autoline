import React, { FC } from 'react';

import { AutocompleteValueType } from '@common/types/cars/autocomplete.type';
import { AutocompleteInput } from '@components/common/autocomplete-input/autocomplete-input';
import { SelectField } from '@components/common/select-field/select-field';
import { getValueById } from '@helpers/get-value-by-id';
import {
  useGetBrandsQuery,
  useGetModelsOfBrandQuery,
} from '@store/queries/cars';

type Props = {
  onBrandDetailsChange: (data: {
    id: string;
    brandId: string;
    modelId: string;
    selectedBrandName: string;
    selectedModelName: string;
  }) => void;
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
  // const [selectedModelId, setSelectedModelId] = useState('');
  // const [selectedBrandId, setSelectedBrandId] = useState('');

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
      selectedBrandName:
        getValueById(brands || [], data?.id || '')?.label || '',
      selectedModelName: '',
    });
  };

  const handleSelectModel = (data: AutocompleteValueType): void => {
    onBrandDetailsChange({
      id,
      brandId: selectedBrandId,
      modelId: data?.id || '',
      selectedBrandName: selectedBrandName?.label || '',
      selectedModelName:
        getValueById(models || [], data?.id || '')?.label || '',
    });
  };

  if (isLoading) return <h1>Loading...</h1>;

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
