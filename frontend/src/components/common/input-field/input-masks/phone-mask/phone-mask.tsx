import React, { ChangeEventHandler } from 'react';
import { IMaskInput as InputMask } from 'react-imask';

interface PhoneMaskProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
}

export const PhoneMask = React.forwardRef<HTMLInputElement, PhoneMaskProps>(
  () => {
    // const { onChange, ...other } = props;
    return (
      <InputMask
        mask="+38 (000) 000-00-00"
        // ref={ref}
        // onAccept={(value: unknown): void =>
        //   onChange({ target: { name: props.name, value: value as string } })
        // }
        overwrite
      />
    );
  },
);
