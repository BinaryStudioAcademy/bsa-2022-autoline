import { PageContainer } from '@components/common/page-container/page-container';
import { Title } from '@components/common/title/title';
import { Header } from '@components/header/header';
import { Wishlist } from '@components/wishlist/wishlist';
import { Grid } from '@mui/material';

const PersonalPage = (): JSX.Element => {
  return (
    <>
      <Header />
      <PageContainer>
        <Title element="h3">Personal page</Title>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Wishlist />
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};

export { PersonalPage };
