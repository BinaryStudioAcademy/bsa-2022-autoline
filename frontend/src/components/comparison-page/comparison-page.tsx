import React from 'react';
import { ScrollSync } from 'react-scroll-sync';

import { PageContainer } from '@components/common/page-container/page-container';
import { Title } from '@components/common/title/title';
import { CompTopTableBar } from '@components/comp-top-table-bar/comp-top-table-bar';
import { OptionsSubtable } from '@components/comparison-options-table/options-subtable';
import { GeneralComparisonTable } from '@components/general-comparison-table/general-comparison-table';
import { Header } from '@components/header/header';

import styles from './styles.module.scss';

const ComparisonPage: React.FC = () => {
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
            <OptionsSubtable title="design" />
            <OptionsSubtable title="sound" />
            <OptionsSubtable title="security" />
            <OptionsSubtable title="multimedia" />
            <OptionsSubtable title="comfort" />
            <OptionsSubtable title="optics" />
            <OptionsSubtable title="auxiliary" />
            <OptionsSubtable title="upholstery" />
          </div>
        </ScrollSync>
      </PageContainer>
    </>
  );
};

export { ComparisonPage };
