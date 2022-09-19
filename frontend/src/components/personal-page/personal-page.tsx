import { PageContainer } from '@components/common/page-container/page-container';
import { Title } from '@components/common/title/title';
import { Footer } from '@components/footer/footer';
import { Header } from '@components/header/header';
import { HistoryOfComparisons } from '@components/history-of-comparisons/history-of-comparisons';
import { UserInfoPanel } from '@components/user-info-panel/user-info-panel';
import { ViewedCars } from '@components/viewed-cars/viewed-cars';
import { Wishlist } from '@components/wishlist/wishlist';
import { Grid } from '@mui/material';

const PersonalPage = (): JSX.Element => {
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
      <Footer />
    </>
  );
};

export { PersonalPage };
