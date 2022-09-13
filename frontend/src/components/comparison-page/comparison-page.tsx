import React, { useState } from 'react';
import { ScrollSync } from 'react-scroll-sync';

import { complectationOptions } from '@common/enums/comparisons/options';
import { PageContainer } from '@components/common/page-container/page-container';
import { Title } from '@components/common/title/title';
import { CompTopTableBar } from '@components/comp-top-table-bar/comp-top-table-bar';
import { OptionsSubtable } from '@components/comparison-options-table/options-subtable';
import { ComparisonPopup } from '@components/comparison-popup/comparison-popup';
import { GeneralComparisonTable } from '@components/general-comparison-table/general-comparison-table';
import { Header } from '@components/header/header';

import styles from './styles.module.scss';

const ComparisonPage: React.FC = () => {
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);
  return (
    <>
      <Header />
      <PageContainer>
        <Title id="comparisonTitle" element="h3">
          Comparison
        </Title>
        <ScrollSync>
          <div className={styles.tablesWrapper}>
            <CompTopTableBar setPopupState={setPopupIsOpen} />
            <GeneralComparisonTable />
            {complectationOptions.map((option) => (
              <OptionsSubtable key={option} title={option} />
            ))}
          </div>
        </ScrollSync>
      </PageContainer>
      <ComparisonPopup isOpen={popupIsOpen} setPopupState={setPopupIsOpen} />
    </>
  );
};

export { ComparisonPage };
