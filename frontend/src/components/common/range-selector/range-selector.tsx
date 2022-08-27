import React, { FC, useEffect, useState } from 'react';

import {
  RangeNames,
  RangeValueNames,
} from '@common/enums/cars/filter-names.enum';
import { RangeValueType } from '@common/types/car-filter/range-value.type';
import { SelectField } from '@components/common/select-field/select-field';
import { MenuItem, SelectChangeEvent } from '@mui/material';

type Props = {
  list: Array<string>;
  minTitle: string;
  maxTitle: string;
  minFilterName: RangeValueNames;
  maxFilterName: RangeValueNames;
  selectedMin: string;
  selectedMax: string;
  rangeName: RangeNames;
  onChange: (range: RangeValueType) => void;
};

const RangeSelector: FC<Props> = (props) => {
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');

  const handleMinChange = (event: SelectChangeEvent): void => {
    setMinValue(event.target.value);
  };

  const handleMaxChange = (event: SelectChangeEvent): void => {
    setMaxValue(event.target.value);
  };

  useEffect(() => {
    if (+maxValue && +minValue > +maxValue) {
      setMinValue(maxValue);
      setMaxValue(minValue);
    }

    props.onChange({
      rangeName: props.rangeName,
      values: {
        [props.minFilterName]: minValue,
        [props.maxFilterName]: maxValue,
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
