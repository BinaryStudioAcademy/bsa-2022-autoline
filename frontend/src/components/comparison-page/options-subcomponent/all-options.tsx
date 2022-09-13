import React from 'react';

import { complectationOptions } from '@common/enums/comparisons/options';
import { OptionsSubtable } from '@components/comparison-options-table/options-subtable';

const AllOptions: React.FC = () => {
  return (
    <>
      {complectationOptions.map((option) => (
        <OptionsSubtable key={option} title={option} />
      ))}
    </>
  );
};

export { AllOptions };
