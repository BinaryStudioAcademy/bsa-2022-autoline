import React, { FC, useEffect, useState } from 'react';

import {
  RangeNames,
  RangeValueNames,
} from '@common/enums/car/car-filters-names.enum';
import { RangeValueType } from '@common/types/cars/range-item.type';
import { SelectField } from '@components/common/select-field/select-field';
import { MenuItem, SelectChangeEvent } from '@mui/material';

type Props = {
  list: Array<string>;
  rangeName: RangeNames;
  minTitle: string;
  maxTitle: string;
  minFilterName: RangeValueNames;
  maxFilterName: RangeValueNames;
  selectedMin: string;
  selectedMax: string;
  onChange: (range: RangeValueType) => void;
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
    let min = minValue;
    let max = maxValue;

    if (+minValue && +maxValue && +minValue > +maxValue) {
      min = maxValue;
      max = minValue;
    }

    props.onChange({
      rangeName: props.rangeName,
      values: {
        [props.minFilterName]: min,
        [props.maxFilterName]: max,
      },
    });
  }, [minValue, maxValue]);

  return (
    <>
      <SelectField
        id={props.minTitle}
        name={props.minTitle}
        value={String(props.selectedMin) || ''}
        onChange={handleMinChange}
        required={false}
        clearable
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
        clearable
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
