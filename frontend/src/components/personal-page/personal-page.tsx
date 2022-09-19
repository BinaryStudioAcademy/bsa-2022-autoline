import { useState } from 'react';

import { PageContainer } from '@components/common/page-container/page-container';
import { Spinner } from '@components/common/spinner/spinner';
import { Title } from '@components/common/title/title';
import { Header } from '@components/header/header';
import { HistoryOfComparisons } from '@components/history-of-comparisons/history-of-comparisons';
import { UserInfoPanel } from '@components/user-info-panel/user-info-panel';
import { ViewedCars } from '@components/viewed-cars/viewed-cars';
import { Wishlist } from '@components/wishlist/wishlist';
import { Grid } from '@mui/material';
import { useGetHistoryOfViwedCarsQuery } from '@store/queries/history-viewed-cars';

const PersonalPage = (): JSX.Element => {
  const [params] = useState({
    skip: '0',
    take: '10',
  });

  const { isLoading } = useGetHistoryOfViwedCarsQuery(params);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
      <PageContainer>
        <Title element="h3">Personal page</Title>
        <UserInfoPanel />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Wishlist />
            <HistoryOfComparisons />
            <ViewedCars />
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};

export { PersonalPage };
