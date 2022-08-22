import React, { ChangeEventHandler } from 'react';
import { IMaskInput as InputMask } from 'react-imask';

interface PhoneMaskProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
}

export const PhoneMask = React.forwardRef<HTMLElement, PhoneMaskProps>(
  (props, ref) => {
    const { onChange, ...other } = props;
    return (
      <InputMask
        {...other}
        mask="+38 (000) 000-00-00"
        inputRef={ref}
        onAccept={(value: unknown): void =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  },
);
