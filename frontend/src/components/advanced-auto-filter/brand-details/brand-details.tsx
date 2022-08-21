import React, { FC, useEffect, useState } from 'react';

import { SelectField } from '@components/common/select-field/select-field';
import { MenuItem, SelectChangeEvent } from '@mui/material';
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
  const { data: models, isLoading: isModelsLoading } = useGetModelsOfBrandQuery(
    selectedBrandId,
    { skip: !selectedBrandId },
  );

  const handleSelectChangeBrand = (event: SelectChangeEvent): void => {
    setSelectedBrandId(event.target.value);
    setSelectedModelId('');
  };

  const handleSelectChangeModel = (event: SelectChangeEvent): void => {
    setSelectedModelId(event.target.value);
  };

  useEffect(() => {
    onBrandDetailsChange({
      id,
      brandId: selectedBrandId,
      modelId: selectedModelId,
    });
  }, [selectedModelId, selectedBrandId]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <SelectField
        id="brand"
        name="Brand"
        value={selectedBrandId}
        onChange={handleSelectChangeBrand}
        disabled={isLoading}
        required={true}
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
        disabled={!selectedBrandId || isModelsLoading}
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
  );
};

export { BrandDetails };
