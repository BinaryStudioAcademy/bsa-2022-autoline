import React, { useState } from 'react';
import { ScrollSync } from 'react-scroll-sync';

import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { PageContainer } from '@components/common/page-container/page-container';
import { Title } from '@components/common/title/title';
import { CompTopTableBar } from '@components/comp-top-table-bar/comp-top-table-bar';
import { AllOptions } from '@components/comparison-page/options-subcomponent/all-options';
import { OnlyDifferentOptions } from '@components/comparison-page/options-subcomponent/only-different-options';
import { GeneralComparisonTable } from '@components/general-comparison-table/general-comparison-table';
import { Header } from '@components/header/header';
import { useGetComparisonGeneralInfoQuery } from '@store/queries/comparisons';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

const ComparisonPage: React.FC = () => {
  const [isOnlyDifferenceShown, setIsOnlyDifferenceShown] = useState(true);

  const { data, isLoading } = useGetComparisonGeneralInfoQuery();

  const showOptionsTables = (): JSX.Element => {
    if (isOnlyDifferenceShown) {
      return <OnlyDifferentOptions data={data} />;
    }
    return <AllOptions />;
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
            <GeneralComparisonTable toggle={isOnlyDifferenceShown} />
            {isLoading || showOptionsTables()}
          </div>
        </ScrollSync>
      </PageContainer>
    </>
  );
};

export { ComparisonPage };
