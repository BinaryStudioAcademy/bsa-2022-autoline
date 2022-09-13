import React from 'react';

import { ComparisonGeneralInform } from '@autoline/shared';
import { complectationOptions } from '@common/enums/comparisons/options';
import { OptionsSubtable } from '@components/comparison-options-table/options-subtable';

const OnlyDifferentOptions: React.FC<{
  data: ComparisonGeneralInform[] | undefined;
}> = ({ data }) => {
  return (
    <>
      {complectationOptions.map((option) => {
        if (data?.some((car) => car.options[option].length)) {
          return <OptionsSubtable key={option} title={option} />;
        }
      })}
    </>
  );
};

export { OnlyDifferentOptions };
