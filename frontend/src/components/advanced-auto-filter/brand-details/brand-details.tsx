import React, { FC, useEffect, useState } from 'react';

import { AutocompleteValueType } from '@common/types/cars/autocomplete.type';
import { AutocompleteInput } from '@components/common/autocomplete-input/autocomplete-input';
import {
  useGetBrandsQuery,
  useGetModelsOfBrandQuery,
} from '@store/queries/cars';

type Props = {
  onBrandDetailsChange: (data: {
    id: string;
    brandId: string;
    modelId: string;
  }) => void;
  id: string;
};

const BrandDetails: FC<Props> = ({ onBrandDetailsChange, id }) => {
  const [selectedModelId, setSelectedModelId] = useState('');
  const [selectedBrandId, setSelectedBrandId] = useState('');

  const { data: brands, isLoading } = useGetBrandsQuery();
  const { data: models } = useGetModelsOfBrandQuery(selectedBrandId, {
    skip: !selectedBrandId,
  });

  const handleSelectBrand = (data: AutocompleteValueType): void => {
    setSelectedBrandId(data?.id || '');
    setSelectedModelId('');
  };

  const handleSelectModel = (data: AutocompleteValueType): void => {
    setSelectedModelId(data?.id || '');
  };

  useEffect(() => {
    onBrandDetailsChange({
      id,
      brandId: selectedBrandId,
      modelId: selectedModelId,
    });
  }, [selectedModelId, selectedBrandId]);

  if (isLoading) return <h1>Loading...</h1>;

  const selectedBrandName = (): AutocompleteValueType => {
    const brand = brands?.find((brand) => brand.id === selectedBrandId);

    return {
      label: brand?.name || '',
      id: brand?.id || '',
    };
  };

  const selectedModelName = (): AutocompleteValueType => {
    const model = models?.find((model) => model.id === selectedModelId);

    return {
      label: model?.name || '',
      id: model?.id || '',
    };
  };

  return (
    <div>
      {brands && (
        <AutocompleteInput
          label="Brand"
          onChange={handleSelectBrand}
          value={selectedBrandName()}
          options={brands.map((item) => ({
            label: item.name,
            id: item.id,
          }))}
        />
      )}
      {models && (
        <AutocompleteInput
          label="Model"
          onChange={handleSelectModel}
          value={selectedModelName()}
          options={models.map((item) => ({
            label: item.name,
            id: item.id,
          }))}
        />
      )}
    </div>
  );
};

export { BrandDetails };
