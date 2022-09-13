import React, { useState } from 'react';
import { ScrollSync } from 'react-scroll-sync';

import { complectationOptions } from '@common/enums/comparisons/options';
import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { PageContainer } from '@components/common/page-container/page-container';
import { Title } from '@components/common/title/title';
import { CompTopTableBar } from '@components/comp-top-table-bar/comp-top-table-bar';
import { OptionsSubtable } from '@components/comparison-options-table/options-subtable';
import { GeneralComparisonTable } from '@components/general-comparison-table/general-comparison-table';
import { Header } from '@components/header/header';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

const ComparisonPage: React.FC = () => {
  const [isOnlyDifferenceShown, setIsOnlyDifferenceShown] = useState(true);

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
            <ButtonOutline
              text="All Parameters"
              className={clsx(
                styles.button,
                !isOnlyDifferenceShown && styles.active,
              )}
              onClick={(): void => setIsOnlyDifferenceShown(false)}
            />
            <ButtonOutline
              text="Only Differences"
              className={clsx(
                styles.button,
                isOnlyDifferenceShown && styles.active,
              )}
              onClick={(): void => setIsOnlyDifferenceShown(true)}
            />
            <GeneralComparisonTable />
            {complectationOptions.map((option) => (
              <OptionsSubtable key={option} title={option} />
            ))}
          </div>
        </ScrollSync>
      </PageContainer>
    </>
  );
};

export { ComparisonPage };
