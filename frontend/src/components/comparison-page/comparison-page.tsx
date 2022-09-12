import React, { useState, useMemo } from 'react';
import { ScrollSync } from 'react-scroll-sync';

import { complectationOptions } from '@common/enums/comparisons/options';
import { PageContainer } from '@components/common/page-container/page-container';
import { Title } from '@components/common/title/title';
import { CompTopTableBar } from '@components/comp-top-table-bar/comp-top-table-bar';
import { OptionsSubtable } from '@components/comparison-options-table/options-subtable';
import { GeneralComparisonTable } from '@components/general-comparison-table/general-comparison-table';
import { Header } from '@components/header/header';
import { useGetComparisonGeneralInfoQuery } from '@store/queries/comparisons';

import styles from './styles.module.scss';

const ComparisonPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOnlyDifferenceShown, setIsOnlyDifferenceShown] = useState(true); // this will be used while implementing toggle button

  const { data, isLoading } = useGetComparisonGeneralInfoQuery();

  const showOptionsTables = (): (React.ReactElement | undefined)[] => {
    if (isOnlyDifferenceShown) {
      return useMemo(
        () =>
          complectationOptions.map((option) => {
            if (data?.some((car) => car.options[option].length)) {
              return <OptionsSubtable key={option} title={option} />;
            }
          }),
        [data],
      );
    }

    return useMemo(
      () =>
        complectationOptions.map((option) => (
          <OptionsSubtable key={option} title={option} />
        )),
      [data],
    );
  };

  return (
    <>
      <Header />
      <PageContainer>
        <Title id="comparisonTitle" element="h3">
          Comparison
        </Title>
        <ScrollSync>
          <div className={styles.tablesWrapper}>
            <CompTopTableBar />
            <GeneralComparisonTable />
            {isLoading || showOptionsTables()}
          </div>
        </ScrollSync>
      </PageContainer>
    </>
  );
};

export { ComparisonPage };
