import React from 'react';

import { CompTopTableBar } from '@components/comp-top-table-bar/comp-top-table-bar';
import { OptionsSubtable } from '@components/comparison-options-table/options-subtable';
import { GeneralComparisonTable } from '@components/general-comparison-table/general-comparison-table';
import { Header } from '@components/header/header';

const ComparisonPage: React.FC = () => {
  return (
    <>
      <Header />
      <CompTopTableBar />
      <GeneralComparisonTable />
      <OptionsSubtable title="design" />
      <OptionsSubtable title="sound" />
    </>
  );
};

export { ComparisonPage };
