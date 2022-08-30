import React, { FC, useEffect, useState } from 'react';

import { FiltersNames } from '@common/enums/car/car-filters-names.enum';
import { RangeValueType } from '@common/types/cars/range-item.type';
import { SelectField } from '@components/common/select-field/select-field';
import { MenuItem, SelectChangeEvent } from '@mui/material';

type Props = {
  list: Array<string>;
  minTitle: string;
  maxTitle: string;
  minFilterName: FiltersNames;
  maxFilterName: FiltersNames;
  selectedMin: string;
  selectedMax: string;
  onChange: (range: RangeValueType[]) => void;
};

const RangeSelector: FC<Props> = (props) => {
  const [minValue, setMinValue] = useState(props.selectedMin);
  const [maxValue, setMaxValue] = useState(props.selectedMax);

  const handleMinChange = (event: SelectChangeEvent): void => {
    setMinValue(event.target.value);
  };

  const handleMaxChange = (event: SelectChangeEvent): void => {
    setMaxValue(event.target.value);
  };

  useEffect(() => {
    setMinValue(props.selectedMin);
    setMaxValue(props.selectedMax);
  }, [props.selectedMin, props.selectedMax]);

  useEffect(() => {
    if (+minValue && +maxValue && +minValue > +maxValue) {
      setMinValue(maxValue);
      setMaxValue(minValue);
    }

    props.onChange([
      { filterName: props.minFilterName, value: minValue },
      { filterName: props.maxFilterName, value: maxValue },
    ]);
  }, [minValue, maxValue]);

  return (
    <>
      <SelectField
        id={props.minTitle}
        name={props.minTitle}
        value={String(props.selectedMin) || ''}
        onChange={handleMinChange}
        required={false}
      >
        {props.list.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </SelectField>
      <SelectField
        id={props.maxTitle}
        name={props.maxTitle}
        value={String(props.selectedMax) || ''}
        onChange={handleMaxChange}
        required={false}
      >
        {props.list.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </SelectField>
    </>
  );
};

export { RangeSelector };
