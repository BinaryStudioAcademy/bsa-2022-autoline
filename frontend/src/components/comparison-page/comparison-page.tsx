import React, { useEffect, useState } from 'react';
import { ScrollSync } from 'react-scroll-sync';

import { ButtonOutline } from '@components/common/button-outline/button-outline';
import { PageContainer } from '@components/common/page-container/page-container';
import { Title } from '@components/common/title/title';
import { CompTopTableBar } from '@components/comp-top-table-bar/comp-top-table-bar';
import { AllOptions } from '@components/comparison-page/options-subcomponent/all-options';
import { OnlyDifferentOptions } from '@components/comparison-page/options-subcomponent/only-different-options';
import { ComparisonPopup } from '@components/comparison-popup/comparison-popup';
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

  useEffect(() => {
    if (data?.length === 1) {
      setIsOnlyDifferenceShown(false);
    }
  }, [data]);

  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);
  return (
    <>
      <Header />
      <PageContainer>
        <Title id="comparisonTitle" element="h3">
          Comparing <span className={styles.count}>{data?.length}</span>{' '}
          complectations
        </Title>
        <ScrollSync>
          <div className={styles.tablesWrapper}>
            <CompTopTableBar setPopupState={setPopupIsOpen} />
            {data?.length ? (
              <ButtonOutline
                text="All Parameters"
                className={clsx(
                  styles.button,
                  !isOnlyDifferenceShown && styles.active,
                )}
                onClick={(): void => setIsOnlyDifferenceShown(false)}
              />
            ) : null}
            {data?.length && data?.length !== 1 ? (
              <ButtonOutline
                text="Only Differences"
                className={clsx(
                  styles.button,
                  isOnlyDifferenceShown && styles.active,
                )}
                onClick={(): void => setIsOnlyDifferenceShown(true)}
              />
            ) : null}
            {data?.length ? (
              <GeneralComparisonTable isOnlyDiff={isOnlyDifferenceShown} />
            ) : null}
            {data?.length !== 0 && (isLoading || showOptionsTables())}
          </div>
        </ScrollSync>
      </PageContainer>
      <ComparisonPopup isOpen={popupIsOpen} setPopupState={setPopupIsOpen} />
    </>
  );
};

export { ComparisonPage };
