import { ModelType } from '@autoline/shared/common/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NormalizedModelsType = { [p: string]: { id: string; name: string } };

const initialState: NormalizedModelsType = {};

const { reducer, actions } = createSlice({
  name: 'car-models',
  initialState,
  reducers: {
    setModels: (state, action: PayloadAction<ModelType[]>) => {
      const newModels = action.payload.reduce(
        (obj, item) => ({ ...obj, [item.id]: item }),
        {},
      );

      return { ...state, ...newModels };
    },
  },
  extraReducers: {},
});

export const { setModels } = actions;

export { reducer };
