import React, { FC, useEffect, useState } from 'react';

import { SelectField } from '@components/common/select-field/select-field';
import { toCamelCase } from '@helpers/strings';
import { MenuItem, SelectChangeEvent } from '@mui/material';

type Props = {
  list: Array<string>;
  minTitle: string;
  maxTitle: string;
  selectedMin: string;
  selectedMax: string;
  onChange: (range: { [p: number]: string }) => void;
};

const RangeSelector: FC<Props> = (props) => {
  const [range, setRange] = useState({
    min: props.selectedMin,
    max: props.selectedMax,
  });

  const handleMinChange = (event: SelectChangeEvent): void => {
    setRange({
      ...range,
      min: event.target.value,
    });
  };

  const handleMaxChange = (event: SelectChangeEvent): void => {
    setRange({
      ...range,
      max: event.target.value,
    });
  };

  useEffect(() => {
    if (+range.max && +range.min > +range.max) {
      [range.min, range.max] = [range.max, range.min];
    }

    props.onChange({
      [toCamelCase(props.minTitle)]: range.min,
      [toCamelCase(props.maxTitle)]: range.max,
    });
  }, [range]);

  return (
    <>
      <SelectField
        id={toCamelCase(props.minTitle)}
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
        id={toCamelCase(props.maxTitle)}
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
